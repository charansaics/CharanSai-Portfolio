import { fetchHome } from "../../lib/fetchHome.js";


export default async function AboutMe(){

    const data = await fetchHome();

    return(
        <div>
            {data.aboutMe}
        </div>
    );
}