import Image from "next/image";

export default async function Home() {

  return (
    // <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
    //   <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        
    //     <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
    //       <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
    //         COMMUNAL TRANSLATION
    //       </h1>
    //     </div>
    //   </main>
    // </div>
    <>
      <p id='head1' className='header'>your community's words</p>
      <p id='head2' className='header'>on <em>your</em> terms</p>
      <p id='head3' className='header'>welcome to the communal translation prototype</p>
      {/* <p id='head4' className='header'>Welcome</p>
      <p id='head5' className='header'>Welcome to BA designs</p> */}
      <button>learn more</button>
      <div className='light x1'></div>
      <div className='light x2'></div>
      <div className='light x3'></div>
      <div className='light x4'></div>
      <div className='light x5'></div>
      <div className='light x6'></div>
      <div className='light x7'></div>
      <div className='light x8'></div>
      <div className='light x9'></div>
    </>
    );
}
