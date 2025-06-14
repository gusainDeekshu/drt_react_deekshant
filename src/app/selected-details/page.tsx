"use client";

import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { selectSelectedData } from '@/app/store/satelliteDataSlice';
import { SatelliteData } from '@/types'; // Import your main data type
import { FaArrowLeft, FaSatellite, FaGlobe, FaRocket, FaCalendarAlt, FaHashtag, FaCode, FaQuestion } from 'react-icons/fa';

// A small helper component to display a single detail item with an icon
const DetailItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string | undefined | null }) => (
    <div className="flex items-start space-x-3 text-slate-300 ">
        <span className="mt-1 text-slate-400">{icon}</span>
        <div>
            <p className="text-sm font-semibold text-slate-400">{label}</p>
            <p className="text-lg text-white">{value || 'N/A'}</p>
        </div>
    </div>
);

// The main page component
const SelectedDetailsPage = () => {
    const router = useRouter();
    const selectedSatellites = useSelector(selectSelectedData);
console.log(selectedSatellites);
    return (
        <div className="min-h-screentext-white p-4 sm:p-6 lg:p-8 ">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-white">
                        Selected Satellite Details
                    </h1>
                    <button
                        onClick={() => router.push('/')}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
                    >
                        <FaArrowLeft />
                        <span>Back to Dashboard</span>
                    </button>
                </div>
                

                {/* Content Section */}
                {selectedSatellites.length > 0 ? (
                    <div className="space-y-6">
                        {selectedSatellites.map((satellite: SatelliteData) => (
                            <div key={satellite.noradCatId} className="bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-700">
                                {/* Satellite Header */}
                                <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-600">
                                    <div className="bg-blue-600 p-3 rounded-full">
                                        <FaSatellite size={24} />
                                    </div>
                                    <h2 className="text-2xl font-semibold text-cyan-300">{satellite.name}</h2>
                                </div>
                                
                                {/* Details Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    <DetailItem 
                                        icon={<FaHashtag />} 
                                        label="NORAD ID" 
                                        value={satellite.noradCatId} 
                                    />
                                    <DetailItem 
                                        icon={<FaCode />} 
                                        label="Int'l Designator" 
                                        value={satellite.intlDes} 
                                    />
                                    <DetailItem 
                                        icon={<FaCalendarAlt />} 
                                        label="Launch Date" 
                                        value={satellite.launchDate} 
                                    />
                                    <DetailItem 
                                        icon={<FaGlobe />} 
                                        label="Country" 
                                        value={satellite.countryCode} 
                                    />
                                    <DetailItem 
                                        icon={<FaRocket />} 
                                        label="Object Type" 
                                        value={satellite.objectType} 
                                    />
                                    <DetailItem 
                                        icon={<FaQuestion />} 
                                        label="Orbit Code" 
                                        value={satellite.orbitCode} 
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center bg-slate-800 p-10 rounded-lg">
                        <h2 className="text-2xl font-semibold mb-4">No Satellites Selected</h2>
                        <p className="text-slate-400">
                            Please go back to the dashboard to select satellites to view their details.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SelectedDetailsPage;