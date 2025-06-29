import Navbar from "@/components/Navbar";
import WeatherCard from "@/components/WeatherCard";
import { SignedIn, SignedOut } from '@clerk/nextjs'
import { MdErrorOutline } from "react-icons/md";

export default function Home() {
    return (
        <main className="">
            <SignedOut>
                <Navbar />
                <div className="h-[calc(100vh-4rem)] flex justify-center items-center text-xl gap-2">
                    <MdErrorOutline className="size-10" />
                    Please Sign Up/Login to continue
                </div>
            </SignedOut>
            <SignedIn>
                <Navbar />
                <WeatherCard />
            </SignedIn>
        </main>
    );
}
