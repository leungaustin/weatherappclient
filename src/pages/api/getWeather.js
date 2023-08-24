const getWeatherResponse = async ({
    city
}) => {
    let response = null;
    try {
        response = await fetch(
            "http://localhost:8080/weatherapp/api/weather?city="+city,
            {
                method: "GET",
                headers: {
                    "Content-Type":"application/json",
                }
            }
        )
        return await response.json();
    }catch(err){
        console.error(err);
    }

}

export default async function handler(req, res){
    try{
        const {city} = req.body;
        console.log("CITY REQUIREMENT")
        console.log(city)
        console.log("CITY REQUIREMENT END")
        
        const weatherResponse = await getWeatherResponse({
            city
        });

        console.log(weatherResponse);

        res.status(200).json({
            weatherResponse,
        });
    }catch(err){
        console.log(err);
        res.status(500).json({ success: false, message: 'Fetching posts failed, please try again' });
    }
}