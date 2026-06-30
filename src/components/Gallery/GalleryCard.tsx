"use client";

import Image from "next/image";
import {
    Eye,
    Pencil,
    Trash2,
} from "lucide-react";

export default function GalleryCard({ image }: any) {
    return (
        <div className="bg-white rounded-xl overflow-hidden border shadow-sm hover:shadow-md transition">

            <Image
                src={image.image}
                width={500}
                height={300}
                alt={image.title}
                className="w-full h-56 object-cover"
            />

            <div className="p-5">

                <h3 className="font-semibold text-lg">
                    {image.title}
                </h3>

                <span className="inline-block mt-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                    {image.category}
                </span>

                <p className="text-sm text-gray-500 mt-4">
                    Uploaded
                </p>

                <p className="font-medium">
                    {image.uploaded}
                </p>

                <div className="flex justify-between mt-5">

                    <button className="w-10 h-10 rounded-lg border flex items-center justify-center hover:bg-gray-100">
                        <Eye size={18} />
                    </button>

                    <button className="w-10 h-10 rounded-lg border flex items-center justify-center hover:bg-blue-50">
                        <Pencil
                            size={18}
                            className="text-blue-600"
                        />
                    </button>

                    <button className="w-10 h-10 rounded-lg border flex items-center justify-center hover:bg-red-50">
                        <Trash2
                            size={18}
                            className="text-red-600"
                        />
                    </button>

                </div>

            </div>

        </div>
    );
}