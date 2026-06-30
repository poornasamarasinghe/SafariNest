"use client";

import Image from "next/image";
import { useState } from "react";
import { Upload } from "lucide-react";

export default function PackageCard({ data }: any) {

  const [preview, setPreview] = useState(data.image);

  const changeImage = (e: any) => {
    const file = e.target.files[0];

    if (!file) return;

    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="bg-white rounded-xl shadow border p-8">

      <div className="grid lg:grid-cols-2 gap-8">

        {/* Left */}

        <div>

          <Image
            src={preview}
            width={600}
            height={350}
            alt=""
            className="rounded-xl object-cover w-full h-[320px]"
          />

          <label className="mt-5 inline-flex cursor-pointer items-center gap-2 bg-green-700 text-white px-5 py-3 rounded-lg">

            <Upload size={18}/>

            Change Image

            <input
              type="file"
              hidden
              accept="image/*"
              onChange={changeImage}
            />

          </label>

        </div>

        {/* Right */}

        <div className="space-y-5">

          <div>
            <label className="font-medium">
              Package Name
            </label>

            <input
              defaultValue={data.name}
              className="w-full mt-2 border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="font-medium">
              Price ($)
            </label>

            <input
              type="number"
              defaultValue={data.price}
              className="w-full mt-2 border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="font-medium">
              Zone
            </label>

            <input
              defaultValue={data.zone}
              className="w-full mt-2 border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="font-medium">
              Duration
            </label>

            <input
              defaultValue={data.duration}
              className="w-full mt-2 border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="font-medium">
              Maximum Guests
            </label>

            <input
              type="number"
              defaultValue={data.guests}
              className="w-full mt-2 border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="font-medium">
              Description
            </label>

            <textarea
              rows={6}
              defaultValue={data.description}
              className="w-full mt-2 border rounded-lg p-3 resize-none"
            />
          </div>

          <button
            className="bg-[#1d2b22] text-white px-8 py-3 rounded-lg hover:bg-[#2d4034]"
          >
            Save Changes
          </button>

        </div>

      </div>

    </div>
  );
}