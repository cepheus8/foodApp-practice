import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
  const [mealsData, setMealsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchMealsHandler = async () => {
    const dataArray = [];
    try {
      const response = await fetch(
        "https://foodapp-158b3-default-rtdb.firebaseio.com//meals.json"
      );
      const responseData = await response.json();

      for (const key in responseData) {
        dataArray.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMealsData(dataArray);
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMealsHandler();
  }, []);

  const mealsList = mealsData.map((meal) => {
    return (
      <MealItem
        id={meal.id}
        key={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    );
  });

  const contentLoading = <p>Loading...</p>;
  const contentError = <p>Something went wrong</p>;

  return (
    <section className={classes.meals}>
      <Card>
        {isLoading && contentLoading}
        {isError && contentError}
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
