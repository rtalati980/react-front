import React ,{useState , useEffect} from 'react'
import './mainBo/bodyc/content.css'
import './productc.css'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const fetchData = async () => {
 
  try {
    const response = await fetch(`https://radhakrishnamart.azurewebsites.net/category/api/`,{
      method: 'GET'
    }
    
    );
   
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};


export default function ({addToCart}){

    const [category, setCategory] = useState([]);
  const { categoryName } = useParams();

  const [cart, setCart] = useState([]); // Initialize cart state as an empty array

  // Function to add a product to the cart
  const handleAddToCart = (pro) => {
    const updatedCart = [...cart, pro]; // Add the product to the cart array
    setCart(updatedCart); // Update the cart state with the new product
    addToCart(pro); // Pass the product to the addToCart function (optional)
    console.log(addToCart(pro));
  };


  useEffect(() => {
    const fetchCategory = async () => {
      const fetchedCategory = await fetchData();
      if (fetchedCategory) {
          setCategory(fetchedCategory);
      }
    };

    fetchCategory();
  }, []);
   
  const filteredCategory = category.filter(cat => cat.name === "Rudraksha");
    return(
        <div className='mcn'>
        {filteredCategory.map(cat => (
      <div key={cat.name} className='pcb' >
        <div className='pcntr' >
          {(cat.products).map(pro => (
            <div key={pro.id}  className='ctpro' >
              <img 
                 src= {`https://radhakrishnamart.azurewebsites.net/product/api/images${pro.images[0]}`}
                  alt={pro.name} />
              <h2><Link to={`/product/${pro.id}`}>{pro.name}</Link></h2> 
              <h3>Rs. {pro.price}.00</h3>
               <p>Radhe Krishna Mart</p>
               <Link to='/cart'><button   onClick={() => addToCart(pro)}>Add To Cart</button></Link>
            </div>
          ))}
        </div>
      </div>
    ))}   
    </div>
    )
    }