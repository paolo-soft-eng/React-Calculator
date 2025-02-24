import React, {useState} from "react";

function Paw(){

    const [students, setStudents] = useState([]);
    const [names, setName] = useState([]);
    const [section, setSection] = useState([]);
    const [year, setYear] = useState(new Date().getFullYear());
    
    function addStudents(){
        const newStudents = {
            name, names,
            year: year,
            section: section
            
        }
        setStudents(s=>[...s, newStudents]);
        setYear(new Date().getFullYear());
        setName("");
        setSection("");
    }
    function removeStudents(index){
        setStudents(s => s.filter((_, i) => i !== index));
    }
    function nameChange(event){
        setName(event.target.value);
    }
    function yearChange(event){
        setYear(event.target.value);
    }
    function sectionChange(event){
        setSection(event.target.value);
    }
    return(
        <>
        <div>
            <h2>List of names</h2>
            <ul>
                {students.map((student, index) => <li key={index} onClick={()=>removeStudents(index)}>{student.names}-{student.section}-{student.year}</li>)}
            </ul>
            <input type="text" placeholder="Enter name" value={names} onChange={nameChange}/><br />
            <input type="text" placeholder="Enter Section" value={section} onChange={sectionChange}/><br />
            <input type="number" placeholder="Enter year" onChange={yearChange} value={year}/><br />
            <button onClick={addStudents}>Add Students</button>
        </div>
        </>
    );
}
export default Paw
// const [isAuthenticated, setIsAuthenticated] = useState(
//     () => localStorage.getItem('isAuthenticated') === 'true'
//   );

//   useEffect(() => {
//     localStorage.setItem('isAuthenticated', isAuthenticated);
//   }, [isAuthenticated]);

//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<LogInSignUp setIsAuthenticated={setIsAuthenticated} />} />

//         <Route 
//           path="/dashboard/*" 
//           element={isAuthenticated ? <DashboardStudent setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/login" replace />} 
//         />

//         <Route 
//           path="/selectNSTP" 
//           element={isAuthenticated ? <SelectNSTP /> : <Navigate to="/login" replace />}
//         />

//         <Route 
//           path="/" 
//           element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} 
//         />
//       </Routes>
//     </Router>