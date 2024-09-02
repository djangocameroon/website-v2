
import { useLocation } from 'react-router-dom'
import { AuthImages } from '../../../assets'

const AuthQuote = () => {
    const { pathname } = useLocation()
    const { avatarsList } = AuthImages;

    const isRegisterPage = pathname === '/auth/register'

    const backgroundImageImage = isRegisterPage ? "stevebg-auth" : "joelfahbg-auth"
    const quote = isRegisterPage ? 
            "I am amazed the Django Cameroon community didn’t have a stigmatizing look regarding women in tech. Instead, I networked with many other girlies like me and it is just fun." 
        : 
            "Being part of this community for over 5 years already made me realised that knowledge is everywhere but opportunity isn't. So, we created an environment for each other's sake."

    const quoteAuthor = isRegisterPage ? "- Steve Yonkeu" : "- Joël FAH"
    
  return (
    <div className={`${backgroundImageImage} max-w-[31rem] w-full h-full hidden md:flex rounded-[3.125rem] border border-secondary px-5 items-end relative`}>
        <div className="space-y-2.5 text-white mb-[3.125rem]">
            <p className='urbanist-font'>{quote}</p>
            <p className="text-end italic font-medium text-xl">{quoteAuthor}</p>
        </div>
        <img src={avatarsList} alt="avatars" className='absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2'  />
    </div>
  )
}

export default AuthQuote