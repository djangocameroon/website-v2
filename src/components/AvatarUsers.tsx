import { Avatars } from '../assets';

const AvatarUsers = () => {
  return (
    <div className=''>
      <div className='-z-10 flex items-center relative'>
        <img
          src={Avatars.avatar1}
          className='z-[100] rounded-full w-9 h-9 bg-purple-500 border border-primary2'
          alt='avatar'
        />
        <img
          src={Avatars.avatar10}
          className='z-[200] absolute left-6 rounded-full w-9 h-9 border border-primary2'
          alt='avatar'
        />
        <img
          src={Avatars.avatar12}
          className='z-[300] absolute left-12  rounded-full w-9 h-9 border border-primary2'
          alt='avatar'
        />
        <img
          src={Avatars.avatar2}
          className='z-[400] absolute left-16 rounded-full w-9 h-9 border border-primary2'
          alt='avatar'
        />
        <img
          src={Avatars.avatar3}
          className='z-[500] absolute left-20  rounded-full w-9 h-9 border border-primary2'
          alt='avatar'
        />
        <img
          src={Avatars.avatar4}
          className='z-[600] absolute left-24  rounded-full w-9 h-9 border border-primary2'
          alt='avatar'
        />
        <img
          src={Avatars.avatar5}
          className='z-[700] absolute left-28  rounded-full w-9 h-9 border border-primary2'
          alt='avatar'
        />
        <img
          src={Avatars.avatar6}
          className='z-[800] absolute left-32  rounded-full w-9 h-9 border border-primary2'
          alt='avatar'
        />
        <img
          src={Avatars.avatar7}
          className='z-[900] absolute left-36  rounded-full w-9 h-9 border border-primary2'
          alt='avatar'
        />
        <img
          src={Avatars.avatar8}
          className='z-[1000] absolute left-40  rounded-full w-9 h-9 border border-primary2'
          alt='avatar'
        />
        <img
          src={Avatars.avatar9}
          className='z-[1100] absolute left-44  rounded-full w-9 h-9 border border-primary2'
          alt='avatar'
        />
        <div className='z-[1200] absolute left-48 w-9 h-9 text-text-color text-sm font-semibold rounded-full bg-secondary/60 flex justify-center items-center'>
          +10K
        </div>
      </div>
    </div>
  );
};

export default AvatarUsers;
