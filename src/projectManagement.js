import logo from './logo.svg';
import './App.css';
import { useState, useRef, useEffect } from 'react';

function ProjectManagement() {
    let [teams, setTeam] = useState([]);
    let projectTitle = useRef('');
    let [teamsTempCopy, setTeamsTemp] = useState([]);
    let [projectAssigned, setProjectAssigned] = useState([]);


    useEffect(()=> {
        fetch('http://localhost:3000/projects').then((response)=> response.json())
        .then((teams) => {
           setTeam(teams) 
           console.log(teams);
           setTeamsTemp(teams);
        });
    }, [0]);
    function assignTeam(event) {
        console.log(projectTitle.current.value);
        let selectedTeam = event.target.value;
        let selectedTeamMembers = teamsTempCopy[selectedTeam];
        console.log(teamsTempCopy);
        if(selectedTeamMembers.length === 0) {
            teamsTempCopy[selectedTeam] = teams[selectedTeam]
        }

        let teamMemberToBeAssigned = teamsTempCopy.pop();
        setTeamsTemp(...teamsTempCopy);
        setProjectAssigned([...projectAssigned, {
            'projectName' : projectTitle.current.value,
            'assignedTeamMember' : teamMemberToBeAssigned
        }
        ]);

        console.log(projectAssigned);

        //
    }

  return (
    <div className="project-management">
      <div id="project-title-container">
      <textarea ref={projectTitle} name="project-title" rows={2} cols={20} ></textarea>
      </div>
      <div id="project-team-selector">
        <label htmlFor="team">Choose the team:</label>
        <select name="team" onChange={assignTeam}>
        {
            teams.map((team) => {
                let teamName = Object.keys(team)[0];
                return (
                    <>
                <option value={teamName}>
        {teamName}
        </option> 
        </>
                )
        
        
                
            })
        }
        </select>
      </div>
    </div>
  );
}

export default ProjectManagement;
