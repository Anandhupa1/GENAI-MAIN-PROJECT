import os
from dotenv import load_dotenv
import openai
import json

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")

product_function = [
    {
        "name": "get_product_id",
        "description": "Get all the id of the product from given text",
        "parameters": {
            "type": "object",
            "properties": {
                "data": {
                    "type": "array",
                    "items": {
                        "type" : "object",
                        "properties" : {
                            "id": {
                                "type": "number",
                                "description": "Product ID, e.g. 1"
                            }
                        },
                        "required" : ["id"]
                    }
                }
            },
            "required": ["data"]    
        },
    }
]


query = """[Document(page_content='{"id": 2, "Name": "Cafe Delhi Heights", "Address": "Chanakya Mall, Ground Floor, Chanakyapuri, New Delhi, Delhi 110021, India", "Google_Map_Location": "https://maps.app.goo.gl/W3JqYh5gSAbiDnZ7A", "Cuisine": "Continental, American, Indian", "Ambiance": "Cozy and contemporary", "Menu": "Burgers, Sandwiches, Pasta, Salads, Desserts, Shakes", "Average Cost for Two": "\\u20b91,200 - \\u20b91,800", "Events and Activities": "Casual dining and get-togethers", "Operating Hours": "11:00 AM - 11:00 PM, hours may vary", "Facilities & Features": {"Air Conditioned": true, "Outdoor Seating": true, "Full Bar Available": true, "Table Reservation Recommended": true, "Free Wi-Fi": true}, "Rating": "4 out of 5 stars", "Best Selling Dish": "CDH Signature Burger", "Booking_Site": "https://www.dineout.co.in/delhi/cafe-delhi-heights-rk-puram-south-delhi-20189", "image": "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/1/i/t/p15105-145690007356d687e9547a8.jpg?tr=tr:n-xlarge", "near": "saket"}', metadata={'seq_num': 2, 'source': '/Users/ansh/Desktop/Projects/GenAI/CafeGuide.ai/backend/db.json'}), Document(page_content='{"id": 3, "Name": "Diggin", "Address": "11, Santushti Shopping Complex, Race Course Road, Chanakyapuri, New Delhi, Delhi 110021, India", "Google_Map_Location": "https://maps.app.goo.gl/nkcnz3f4yCTqEvVu6", "Cuisine": "Italian, Continental", "Ambiance": "Charming with outdoor seating and greenery, elegant decor", "Menu": "Italian dishes, Pasta, Pizza, Salads, Sandwiches, Desserts, Coffee, Mocktails", "Average Cost for Two": "\\u20b91,200 - \\u20b91,800", "Events and Activities": "Primarily for dining and relaxation", "Operating Hours": "Lunch and dinner, hours may vary", "Facilities & Features": {"Air Conditioned": true, "Outdoor Seating": true, "Kid-Friendly": true, "Table Reservation Recommended": true, "Free Wi-Fi": true}, "Rating": "4.5 to 5 stars", "Best Selling Dish": "Lasagna or Red Velvet Cake", "Booking_Site": "https://www.dineout.co.in/delhi/diggin-chanakyapuri-south-delhi-34492", "image":', metadata={'seq_num': 3, 'source': '/Users/ansh/Desktop/Projects/GenAI/CafeGuide.ai/backend/db.json'}), Document(page_content='{"id": 1, "Name": "Hauz Khas Social", "Address": "D-88, 2nd Floor, 31st December Marg, Block D, Hauz Khas, New Delhi, Delhi 110016, India", "Google_Map_Location": "https://maps.app.goo.gl/hRtvW2R728xL7iR77", "Cuisine": "Indian, Continental, Asian", "Ambiance": "Contemporary, Industrial-style, Rooftop seating with a view of Hauz Khas Lake", "Menu": "Burgers, Sandwiches, Pasta, Cocktails, Mocktails, and more", "Average Cost for Two": "\\u20b91,500 - \\u20b92,500 or more", "Events and Activities": "Live music, social gatherings, nightlife", "Operating Hours": "Varies, check official website or contact them for current hours", "Facilities & Features": {"Air Conditioned": true, "Outdoor Seating": true, "Full Bar Available": true, "Live Music": true, "Rooftop Seating": true, "Smoking Area": true, "Free Wi-Fi": true, "Table Reservation Not Required": true}, "Rating": "4 out of 5 stars", "Best Selling Dish": "Butter Chicken Biryani", "Booking_Site":', metadata={'seq_num': 1, 'source': '/Users/ansh/Desktop/Projects/GenAI/CafeGuide.ai/backend/db.json'}), Document(page_content='"https://im1.dineout.co.in/images/uploads/restaurant/sharpen/1/i/t/p15105-145690007356d687e9547a8.jpg?tr=tr:n-xlarge", "near": "saket"}', metadata={'seq_num': 3, 'source': '/Users/ansh/Desktop/Projects/GenAI/CafeGuide.ai/backend/db.json'}), Document(page_content='"https://www.dineout.co.in/delhi/hauz-khas-social-hauz-khas-village-south-delhi-16246", "image": "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/1/i/t/p15105-145690007356d687e9547a8.jpg?tr=tr:n-xlarge", "near": "Hauz Khas"}', metadata={'seq_num': 1, 'source': '/Users/ansh/Desktop/Projects/GenAI/CafeGuide.ai/backend/db.json'})]"""


completion = openai.ChatCompletion.create(
    model="gpt-3.5-turbo-0613",
    messages = [{"role" : "user", "content" : query}],
    functions = product_function,
    function_call = "auto"
)

output = completion.choices[0].message

arguments = json.loads(output.function_call.arguments)

print(arguments)