import { useEffect, useState } from "react";
import {nanoid} from 'nanoid';
import NotesList from "./components/NotesList";
import Search from "./components/Search";
import Header from "./components/Header";

const App = ()=>{
  	const [notes, setNotes] = useState(()=>{
    const savedNotes = JSON.parse(localStorage.getItem('react-notes-app-data'));
    return savedNotes||[];
  });
  const [searchText,setSearchText] = useState('');

  const [darkMode,setDarkMode] = useState(false);
  
  useEffect(()=>{
    localStorage.setItem('react-notes-app-data',JSON.stringify(notes));
  },[notes]);


  const addNote=(text)=>{
    //console.log(text);
    const newNote={
      id:nanoid(),
      text:text,
      date:new Date().toLocaleDateString()
    }
    const newNotes = [...notes,newNote];
    setNotes(newNotes);
  }

  const deleteNote=(id)=>{
    const newNotes=notes.filter((note)=>note.id !== id);
    setNotes(newNotes);
  }
  return (
  <div className={`${darkMode && 'dark-mode'}`}>
    <div className="container">
      <Header handleToggleDarkMode={setDarkMode}/>
      <Search handleSearchNote={setSearchText}/>
      <NotesList notes={notes.filter((note)=>note.text.toLowerCase().includes(searchText.toLowerCase()))} handleAddNote={addNote} handleDeleteNote={deleteNote}/>
    </div>
  </div>
  );
};
export default App;