"use client"
import { useState ,useEffect} from 'react';
import styles from './page.module.css';
import axios from 'axios';

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [country, setCountry] = useState('');
  const [job, setJob] = useState('');
  const [skills, setSkills] = useState('');
 

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/jobs/jobs'); 
        setJobs(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des métiers:', error);
      }
    };

    fetchJobs();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
   
    console.log('Pays:', country);
    console.log('Emploi:', job);
    console.log('Compétences:', skills);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
     
      <div className={styles.formGroup}>
        <label htmlFor="country">Country :</label>
        <select
          id="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        >
          <option value="">choose your country</option>
          <option value="France">France</option>
          <option value="Canada">Canada</option>
          <option value="United States">United Staters</option>
          <option value="Tunisia">Tunisia</option>
        </select>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="job">job:</label>
        <select
          id="job"
          value={job}
          onChange={(e) => {
            setJob(e.target.value);
            
            setSkills('');
          }}
          required
        >
          <option value="">choose your job</option>
          {jobs.map(job => (
            <option key={job._id} value={job.job}>{job.job}</option>
          ))}
        </select>
      </div>
      {job && (
  <div className={styles.formGroup}>
    <label htmlFor="skills">Skills :</label>
    <select
      id="skills"
      value={skills}
      onChange={(e) => setSkills(e.target.value)}
    >
      <option value="">Sélectionnez une compétence</option>
      {jobs.find(j => j.job === job)?.skills.map(skill => (
        <option key={skill} value={skill}>{skill}</option>
      ))}
    </select>
  </div>
)}
      <button type="submit">Send</button>
    </form>
  );
}
