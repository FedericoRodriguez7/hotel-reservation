import { useQuery } from "@tanstack/react-query";
import { useRoute, Link,} from "wouter";

import {Button, Typography, Card, CardActions, CardContent, CardMedia } from "@mui/material";
import BookingForm from "./BookingForm";
import "../../src/HoteLDetail.css"; 

const fetchHotel = async (id) => {
    const res = await fetch(`http://localhost:3001/hotels/${id}`);
    if (!res.ok) {
        throw new Error("Network response was not OK");
    }
    return res.json();
}

function HotelDetails() {
    const [match, params] = useRoute("/hotel/:id");
    const { data: hotel, isLoading, error } = useQuery({
        queryKey: ["hotel", params.id],
        queryFn: () => fetchHotel(params.id),
        enabled: !!params.id, // Habilita la consulta solo si params.id está definido
    });

    if (isLoading) {
        return <div className="Loading">Loading...</div>;
    }

    if (error || !params.id) {
        return (
            <div>
                Error fetching Hotel {error ? error.message : "No se encontró el hotel."}
            </div>
        );
    }

    return (
        <div>
            
      <header className="header-details">
        <h4 className="details">Hotel Details</h4>
      </header>
      
      <div className="Main-details">
        <div className="backHotels">
           <Link href="/">Volver a la lista de hoteles</Link> 
        </div>
        
        <Card className="Card-details">
          <CardMedia
            className="CardMedia-details"
            component="img"
            image={hotel.img}
            title={hotel.name}
          />
          <CardContent className="CardContent-details">
            <Typography gutterBottom variant="h5" component="div">
              {hotel.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" className="Description-details">
              {hotel.description}
            </Typography>
          </CardContent>
          
        </Card>
        <div className="BookingForm-details">
          <BookingForm hotel={hotel} />
        </div>
      </div>
    </div>
    );
}

export default HotelDetails;
