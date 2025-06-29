"use client"

import { formatTime } from '@/lib/Date'
import axios from 'axios'
import Image from 'next/image'
import React, { useState } from 'react'
import { IoSearch } from 'react-icons/io5'

type weatherDataType = {
    coordinates: { lat: number, lon: number },
    main: {
        feels_like: number,
        grnd_level: number,
        humidity: number,
        pressure: number,
        sea_level: number,
        temp: number
        temp_max: number
        temp_min: number
    },
    name: string,
    sys: {
        country: string,
        sunrise: string,
        sunset: string
    },
    weather: {
        description: string,
        icon: string,
        id: number,
        main: string
    },
    wind: {
        deg: number,
        gust: number,
        speed: number
    }
}

export default function WeatherCard() {
    const [city, setCity] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [data, setData] = useState<weatherDataType | null>(null);

    const handleSearch = async () => {
        try {
            setIsSearching(true);
            const { data } = await axios.post('/api/weather', { city }, {
                validateStatus: (status) => status < 500
            });
            if (data.success) {
                const weatherData = {
                    coordinates: data.data.coord,
                    main: data.data.main,
                    name: data.data.name,
                    sys: {
                        country: data.data.sys.country,
                        sunrise: formatTime(data.data.sys.sunrise),
                        sunset: formatTime(data.data.sys.sunset)
                    },
                    weather: data.data.weather[0],
                    wind: data.data.wind
                }
                setData(weatherData);
            }
            else {
                alert(data.error)
            }
        } catch (error) {
            throw error;
        } finally {
            setIsSearching(false);
        }
    }

    return (
        <div className='w-full h-[calc(100vh-4rem)] flex flex-col justify-start items-center gap-y-10'>
            <div className='pt-10 relative'>
                <IoSearch className='size-6 absolute top-12 left-2' />
                <input
                    type="text"
                    placeholder="Enter City"
                    className="input rounded-md bg-white/7 outline-none w-[30rem] pl-10"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button className='bg-blue-500 rounded-full px-4 py-1/2 border border-blue-600 absolute right-2 top-12 hover:scale-102 transition-all cursor-pointer z-10' onClick={handleSearch}>
                    {
                        !isSearching ? "Search" : "Searching..."
                    }
                </button>
            </div>
            <div>
                <div className="card bg-white/10 w-96 shadow-lg h-fit flex flex-col hover:shadow-xl transition">
                    <Image
                        src={`https://openweathermap.org/img/wn/${data?.weather.icon}@2x.png`}
                        alt={data?.weather.main || "image"}
                        className='h-[15rem] w-full object-cover p-2 rounded-xl'
                        width={50}
                        height={50}
                        quality={100}
                    />
                    <div className="card-body">
                        <h2 className="card-title">📍   City: { data?.name } ({ data?.sys.country })</h2>
                        <div className='flex w-full'>
                            <div className='w-1/2'>
                                <p className='flex flex-col tracking-wide'>
                                    <span className='pl-5 font-semibold italic'>Weather Report:</span>
                                    <span>🌡️ Temperature: { data?.main.temp }</span>
                                    <span>💧 Humidity: { data?.main.humidity }%</span>
                                    <span>🌬️ Wind Speed: { data?.wind.speed }</span>
                                    <span>🌅 SunRise: { data?.sys.sunrise }</span>
                                    <span>🌇 SunSet: { data?.sys.sunset }</span>
                                </p>
                            </div>
                            <div className='w-1/2'>
                                <p className='flex flex-col tracking-wide'>
                                    <span className='pl-5 font-semibold italic'>Feels Like: { data?.weather.main }</span>
                                    <span className='capitalize'>🌤️ { data?.weather.description }</span>
                                    <span className='pl-5'>Latitude: { data?.coordinates.lat }</span>
                                    <span className='pl-5'>Longitude: { data?.coordinates.lon }</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
