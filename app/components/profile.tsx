import React from 'react'

const Profile = () => {
  return (

<div className="w-[247px] h-[314px] rounded-md border border-black border-opacity-10 flex-col justify-start items-center inline-flex">

{/* Profile Circle */}
<div className="w-[285px] h-[145px] p-3 justify-center items-center gap-2 inline-flex"> 
<div className="w-[117px] h-[116px] justify-center items-center gap-2 flex"> 
<div className="w-[114px] h-[113px] relative bg-black bg-opacity-10 rounded-[100px]" />
</div>
</div>

{/* Mentor Name */}
<div className="flex-col justify-start items-start flex">
<div className="self-stretch h-5 text-black text-sm font-medium font-['Roboto'] leading-tight">Mentor name</div>
</div>


{/* Major and State */}
<div className="w-[207px] h-10 px-3 py-5 flex-col justify-center items-center gap-[30px] flex">
<div className="w-[184px] h-[27px] justify-center items-end gap-1.5 inline-flex">
<div className="px-1 py-0.5 bg-zinc-300 bg-opacity-50 rounded-sm border border-black border-opacity-10 justify-center items-center gap-0.5 flex">
<div className="text-black text-xs font-normal font-['Roboto'] leading-none">Major</div>
</div>

<div className="px-1 py-0.5 bg-zinc-300 bg-opacity-50 rounded-sm border border-black border-opacity-10 justify-center items-center gap-0.5 flex">
<div className="text-black text-xs font-normal font-['Roboto'] leading-none">State</div>
</div>
</div>
</div>


{/*Profile Description */}
<div className="w-[217px] h-[66px] flex-col justify-center items-center gap-2.5 flex">
<div className="w-[183px] text-center text-black text-opacity-80 text-[10px] font-normal font-['Montserrat'] leading-3">A little description or experience about mentor</div>
</div>
</div>

  )
}

<script>





</script>



export default Profile