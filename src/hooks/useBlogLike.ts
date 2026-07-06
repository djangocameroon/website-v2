"use client";

import { useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { blogApi } from '@/lib/blogApi'
import { BlogPost } from '@/types/blog'

export const useBlogLike = (blog: BlogPost | null) => {
    const [liked, setLiked] = useState(false)
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (blog) {
            setLiked(blog.is_liked_by_user)
            setCount(blog.likes)
        }
    }, [blog])

    const mutation = useMutation({
        mutationFn: (id: string) => blogApi.togglePost(id),
        onMutate: () => {
            // optimistic update
            const previous = { liked, count }
            setLiked(prev => !prev)
            setCount(prev => liked ? prev - 1 : prev + 1)
            return previous
        },
        onSuccess: (response) => {
            // sync with server truth
            setLiked(response.liked)
            setCount(response.likes_count)
        },
        onError: (_error, _id, previous) => {
            toast.error(`Couldn't ${liked ? "unlike" : "like"} blog. Try again later`)
            if (previous) {
                setLiked(previous.liked)
                setCount(previous.count)
            }
        },
    })

    const toggle = () => {
        if (!blog) return
        if (mutation.isPending) return
        mutation.mutate(blog.id)
    }

    return { liked, count, toggle, loading: mutation.isPending }
}
