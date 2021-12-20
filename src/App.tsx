import { useState } from 'react';
import './App.css';
import LoginPage from './components/pages/LoginPage';
import RecipeListPage from './components/pages/RecipeListPage';

enum ActivePage {
  Login,
  RecipeList,
}

function App() {
  const [activePage, setActivePage] = useState(ActivePage.Login);

  const onLogin = (token: String) => {
    setActivePage(ActivePage.RecipeList);
  }


  let page
  switch (activePage) {
    case ActivePage.Login:
      page = <LoginPage onLogin={onLogin} />
      break
    case ActivePage.RecipeList:
      page = <RecipeListPage />
      break
  }


  return (
    <div className="App">
      {page}
    </div>
  );
}

export default App;
