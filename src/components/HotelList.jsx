import { Button, Card, CardActions, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import "../../src/HotelList.css"; 

const fetchHotels = async () => {
    const res = await fetch("http://localhost:3001/hotels");
    if (!res.ok) {
        throw new Error("Network response was not OK");
    }

    return res.json();
}

function HotelList() {
    const {
        data: hotels,
        isLoading,
        error,
    } = useQuery({ queryKey: ["hotels"], queryFn: fetchHotels });
    
    if (isLoading) {
        return <div className="Loading">Loading...</div>;
    }

    if (error) {
        return <div>Error fetching Hotels {error.message}</div>;
    }

    return (
        <div>
            <header>
                <h4>Booking App</h4>
            </header>
            <div className="Main">
                {hotels.map((hotel) => (
                    <Link key={hotel.id} href={`/hotel/${hotel.id}`} className="Link">
                        <Card className="Card">
                            <CardMedia
                                className="CardMedia"
                                component="img"
                                image={hotel.img}
                                title={hotel.name}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {hotel.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {hotel.description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button className="Button" size="small">
                                    <Link href={`/hotel/${hotel.id}`} className="Link">
                                        See details
                                    </Link>
                                </Button>
                            </CardActions>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default HotelList;
