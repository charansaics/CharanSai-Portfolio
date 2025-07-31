'use client';

import { fetchHome } from "@/lib/fetchHome";
import { useEffect, useState } from "react";

export default function AboutMe(){

    const [details, setDetails] = useState(null)

    useEffect(async() =>{
        const data = await fetchHome();
        setDetails(data);
    },[details])
}
