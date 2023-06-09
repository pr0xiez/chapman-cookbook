import { AddRecipe } from "@/server/api/routers/recipe";

export const sections = [
  {
    title: "Appetizers",
  },
  {
    title: "Side Dishes",
  },
  {
    title: "Main Dishes",
  },
  {
    title: "Soups & Salads",
  },
  {
    title: "Baked Goods",
  },
  {
    title: "Desserts",
  },
  {
    title: "Holiday Dishes",
  },
];

export const cookbook: Record<string, Omit<AddRecipe, "cookbookSectionId">[]> =
  {
    Appetizers: [
      {
        title: "Meatballs",
        author: "Christa Harmon",
        ingredients: [
          {
            text: "32 oz. pkg fully cooked & frozen meatballs",
          },
          {
            text: "32 oz. jar Grape jelly",
          },
          {
            text: "20 oz. Chili sauce or BBQ sauce (I prefer Chili)",
          },
        ],
        instructions: `Combine jelly & chili sauce | BBQ sauce. Give that a stir.
            Pour ever meatballs & stir well. Cook in the crock pot on low for 4hrs or on high for 2hrs until heated through.
            Stir occasionally.`,
      },
      {
        title: "Buffalo Chicken Dip",
        author: "Christa Harmon",
        ingredients: [
          {
            text: "2 cans chunk chicken drained",
          },
          {
            text: "2 plg cream cheese softened",
          },
          {
            text: "1 cup of ranch dressing",
          },
          {
            text: "3/4 cup of Buffalo wing sauce",
          },
          {
            text: "1 1/2 cups of shredded cheddar cheese",
          },
        ],
        instructions: `Heat chick & hot sauce in a skillet over medium heat until heated through.
            Stir in cream cheese and ranch dressing. Cook, stirring until well blended & warm.
            Mix in half of the cheese & transfer the mixture to a slow cooker. Sprinkle the remaining
            cheese over the top, cover and cook on low setting until hot and bubbly. If cooking in the oven,
            add to a 450deg oven for 10-15 min. Serve w/ tortilla chips or celery.`,
      },
      {
        title: "Cheese Ball",
        author: "Rosemary Hall",
        ingredients: [
          {
            text: "1 8oz pkg shredded sharp cheddar cheese",
          },
          {
            text: "2 8oz pkg cream cheese",
          },
          {
            text: "1/4 cup chopped green onion",
          },
          {
            text: "1/4 cup mayo or miracle whip",
          },
          {
            text: "1 small pkg dried beef (budding)",
          },
          {
            text: "1 small pkg pecans",
          },
        ],
        instructions: `Mix all ingredients together except pecans. Chill for 2 hrs. Roll into ball & roll through pecans.`,
      },
      {
        title: "Salsa",
        author: "Christa Harmon",
        ingredients: [
          {
            text: "2 cans diced tomatoes (in food processor)",
          },
          {
            text: "1 small can tomato sauce",
          },
          {
            text: "1 medium onion (chop fine)",
          },
          {
            text: "4 cloves minced garlic",
          },
          {
            text: "Jalapenos (chop fine)",
          },
          {
            text: "Cilantro - handful (chop fine), best if fresh",
          },
        ],
        instructions: `Salt to taste. Refrigerate overnight before serving.`,
      },
    ],
    "Soups and Salads": [
      {
        title: "Potato Soup",
        author: "Phyllis Carder",
        ingredients: [
          {
            text: "10 peeled potatoes, whole",
          },
          {
            text: "1 chopped onion",
          },
          {
            text: "1 pack diced ham",
          },
          {
            text: "1 stick butter",
          },
          {
            text: "1/2 loaf velveta cheese",
          },
        ],
        instructions: `Cover potatoes with water. Cook until they fall apart. Add onion, butter, ham, velveeta.
          Add more cheese to thicken OR add milk to make thinner. Salt & pepper to taste.`,
      },
      {
        title: "Sausage Corn Chowder",
        author: "Christa Harmon",
        serves: 4,
        ingredients: [
          {
            text: "1 8oz breakfast sausage",
          },
          {
            text: "1 can Campbell's cream of chicken soup",
          },
          {
            text: "1 soup can of milk",
          },
          {
            text: "1 can whole kernel sweet corn, undrained",
          },
          {
            text: "1/2 cup shredded swiss cheese",
          },
          {
            text: "1/4 tsp hot sauce (optional)",
          },
        ],
        instructions: `Brown sausage & chop to separate. Drain off fat. In a soup pot, stir in soup, milk, corn, sausage & hot sauce.
          Cook until heated & add cheese. Stir frequently to keep milk from scorching & cheese melts. Serve with warm french bread.`,
      },
      {
        title: "Cheeseburger Soup",
        author: "Shirley Chapman",
        serves: 8,
        ingredients: [
          {
            text: "1/2 lb ground beef",
          },
          {
            text: "3/4 cup chopped onion",
          },
          {
            text: "3/4 cup shredded carrots",
          },
          {
            text: "3/4 cup diced celery",
          },
          {
            text: "4 tbsp. butter or margarine, divided",
          },
          {
            text: "3 cups chicken broth",
          },
          {
            text: "4 cups diced peeled potatoes",
          },
          {
            text: "1/4 cup flour",
          },
          {
            text: "8oz. velveeta cheese",
          },
          {
            text: "1 1/2 cup milk",
          },
          {
            text: "3/4 tsp salt",
          },
          {
            text: "1/2 tsp pepper",
          },
          {
            text: "1/4 cup sour cream",
          },
        ],
        instructions: `Cook beef, drain. Mix all ingredients together.`,
      },
      {
        title: "Max & Erma's Chicken Tortilla Soup",
        author: "Abbie Amaya",
        serves: 15,
        ingredients: [
          {
            text: "2 cans cream of mushroom soup",
          },
          {
            text: "2 cans cream of chicken soup",
          },
          {
            text: "2 cans cream of celery soup",
          },
          {
            text: "2 cans cheddar cheese soup",
          },
          {
            text: "2 15oz. cans chicken broth",
          },
          {
            text: "1 15oz. can diced tomatoes",
          },
          {
            text: "1 cup chunky salsa",
          },
          {
            text: "1 can diced green chilis",
          },
          {
            text: "1 onion, chopped",
          },
          {
            text: "4 garlic cloves, minced",
          },
          {
            text: "1 tsp. red chili powder",
          },
          {
            text: "4 chicken breasts, cooked & chopped",
          },
        ],
        instructions: `Add to large pot. Bring to a boil & simmer 1 hr. You can use fat free soups where you can.
          Can be topped with tortilla strips or shredded cheese. (You can cut this recipe in half).`,
      },
      {
        title: "Crunchy Cole slaw",
        author: "Shirley Chapman",
        ingredients: [
          {
            text: "1 bag of premade cole slaw",
          },
          {
            text: "2 pkg of beef ramen noodles - save flavor packets for dressing",
          },
          {
            text: "9 bundles of chopped green onions",
          },
          {
            text: "3 stalks of celery, chopped",
          },
          {
            text: "8 tbsp. slivered almonds",
          },
          {
            text: "8 tbsp. sesame seeds",
          },
          {
            text: "1 cup vegetable oil",
          },
          {
            text: "1/3 cup vinegar",
          },
          {
            text: "1/2 cup sugar",
          },
          {
            text: "2 pkg of beef ramen noodle packets",
          },
        ],
        instructions: `Chill dry ingredients. Mix dressing & pour over salad right before serving.`,
      },
    ],
    "Side Dishes": [
      {
        title: "Fried Apples",
        author: "Christa Harmon",
        serves: 2,
        ingredients: [
          {
            text: "2 lg. tart apples (Honeycrisp or Grannie Smith) diced or sliced",
          },
          {
            text: "Cinnamon to taste",
          },
          {
            text: "Brown sugar to taste",
          },
          {
            text: "A few drops of lemon juice",
          },
          {
            text: "Corn starch to thicken",
          },
          {
            text: "Butter or margarine",
          },
        ],
        instructions: `Heat butter or margarine in a sauce pan. Add apples (you can peel or leave the skin on). Add cinnamon, brown sugar & lemon juice.
          If sauce is too runny you can add corn starch to thicken. Cook until apples are soft.`,
      },
      {
        title: "Macaroni & Cheese",
        author: "Christa Harmon",
        ingredients: [
          {
            text: "1 lb. macaroni",
          },
          {
            text: "8oz. velveeta",
          },
          {
            text: "1/2 cup sharp cheddar",
          },
          {
            text: "1/8 cup parmesan cheese",
          },
          {
            text: "2 cups milk",
          },
        ],
        instructions: `Cook macaroni & drain. Melt cheese on stove. Pour over macaroni & bake at 350 for 30 minutes.`,
      },
    ],
    Desserts: [
      {
        title: "Mountain Dew Cake",
        author: "Christa Harmon",
        ingredients: [
          {
            text: "1 box lemon cake mix",
          },
          {
            text: "1 3.4oz. box lemon instant pudding",
          },
          {
            text: "1 12oz. can of Mountain Dew",
          },
          {
            text: "3/4 cup vegetable oil",
          },
          {
            text: "4 large eggs",
          },
          {
            text: "1 can of lemon icing",
          },
        ],
        instructions: `Preheat oven to 325. Lightly grease & flour a 10 cup Bundt pan. Pam cooking spray works fine.
          In a large bowl combine cake mix, pudding, soda, oil & eggs. Beat at medium speed with a mixer until smooth.
          Pour batter into prepared pan & bake 45-50 minutes or until a wooden toothpick comes out clean.
          Cool in the pan for 10 min then remove from pan & cool completely. Warm lemon icing in microwave until pourable.
          Use as much as you like.`,
      },
      {
        title: "Pumpkin Crunch Cake",
        author: "Christa Harmon",
        ingredients: [
          {
            text: "1 box yellow cake mix",
          },
          {
            text: "1 can 15oz. solid pack pumpkin",
          },
          {
            text: "1 12oz can evaporated milk",
          },
          {
            text: "3 large eggs",
          },
          {
            text: "1 1/2 cups sugar",
          },
          {
            text: "1 tsp. cinnamon",
          },
          {
            text: "1/2 tsp. salt",
          },
          {
            text: "1/2 cup chopped pecans",
          },
          {
            text: "1 cup butter",
          },
          {
            text: "Cool whip",
          },
        ],
        instructions: `Preheat oven to 350. Grease bottom of a 9x13 pan. Combine pumpkin, evap milk, eggs, sugar, cinnamon & salt in a large bowl.
          Pour into prepared pan. Sprinkle dry cake mix evenly over pumpkin mixture. Top with pecans. Drizzle melted butter over pecans.
          Bake at 350 for 50-55 min or until golden brown. Serve warm or cool. Top with cool whip.`,
      },
      {
        title: "Buckeye Bars",
        author: "Christa Harmon",
        ingredients: [
          {
            text: "2 sticks margarine (softened)",
          },
          {
            text: "1 lb. powdered sugar",
          },
          {
            text: "1 cup peanut butter",
          },
          {
            text: "12oz. bag of milk chocolate chips",
          },
          {
            text: "1/2 cup peanut butter",
          },
        ],
        instructions: `Spray 9x13 with pam. Mix 1st 3 ingredients together & microwave 1 minute. Mix thoroughly & microwave 1 more minute.
          Pour in 9x13 & refrigerate for 30 min. Mix together last 2 ingredients & microwave 1 minute. Stir thoroughly & microwave 1 more minute.
          Pour over first layer & refrigerate again until firm.`,
      },
      {
        title: "Snow Ice Cream",
        author: "Christa Harmon",
        ingredients: [
          {
            text: "5-6 cups of snow",
          },
          {
            text: "1 cup of milk",
          },
          {
            text: "1/2 cup sugar",
          },
          {
            text: "1 tsp. vanilla",
          },
        ],
        instructions: ``,
      },
      {
        title: "Cookie Sheet Cake",
        author: "Phyllis Carder",
        ingredients: [
          {
            text: "2 cups all purpose flour",
          },
          {
            text: "2 cups sugar",
          },
          {
            text: "4 tbsp. cocoa",
          },
          {
            text: "1 stick butter",
          },
          {
            text: "1/2 cup oil",
          },
          {
            text: "1 cup water",
          },
          {
            text: "1/2 cup buttermilk",
          },
          {
            text: "1 tsp. vanilla",
          },
          {
            text: "1 tsp. soda",
          },
          {
            text: "2 eggs",
          },
        ],
        instructions: `Mix flour, sugar, cocoa together. Boil water, oil, butter - pour over flour mixture - mix well.
          Mix soda, buttermilk. Add eggs, vanilla - beat all mixture well. Bake 350 for 20 min - ungreased cookie sheet.`,
      },
    ],
  };
