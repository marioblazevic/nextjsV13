import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Product } from "@/models/Product.model";

interface Props {
  products: Product[];
}

const ProductsList: React.FC<Props> = (props) => {
  return (
    <Grid container spacing={4}>
      {props.products.map((item: Product) => (
        <Grid item key={item.id} xs={12} sm={6} md={4}>
          <Card
            role="article"
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <CardMedia
              component="img"
              sx={{
                pt: "56.25%",
              }}
              image={item.images[0]}
              alt="random"
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="h2">
                {item.title}
              </Typography>
              <Typography>{item.description}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductsList;
