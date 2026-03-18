import { blogApi } from '@/lib/blogApi'
import { BlogPost } from '@/types/blog'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export const useBlogLike = (blog: BlogPost | null) => {
    const [liked, setLiked] = useState(false)
    const [count, setCount] = useState(0)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (blog) {
            setLiked(blog.is_liked_by_user)
            setCount(blog.likes)
        }
    }, [blog])

    const toggle = async () => {
        if (!blog) return
        if (loading) return

        // optimistic update
        setLiked(prev => !prev)
        setCount(prev => liked ? prev - 1 : prev + 1)
        setLoading(true)

        try {
            const response = await blogApi.togglePost(blog.id)
            // sync with server truth
            setLiked(response.liked)
            setCount(response.likes_count)
        } catch {
            toast.error(`Couldn't ${liked ? "unlike" : "like"} blog. Try again later`)
            // roll back on failure
            setLiked(prev => !prev)
            setCount(prev => liked ? prev + 1 : prev - 1)
        } finally {
            setLoading(false)
        }
    }

    return { liked, count, toggle, loading }
}