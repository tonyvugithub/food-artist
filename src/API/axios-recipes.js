import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.spoonacular.com/recipes',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default instance;