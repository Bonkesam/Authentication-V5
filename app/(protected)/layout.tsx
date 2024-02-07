import Navbar from "./_components/navbar";

const ProtectedLayout = ({children}: {children: React.ReactNode})=>{
    return (
        <div className="h-full w-ful flex flex-col gap-y-10 items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1bb7ff] to-[#04244b]">
            <Navbar />
            {children}
        </div>
    );
}

export default ProtectedLayout;