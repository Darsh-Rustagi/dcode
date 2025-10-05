'use client';

import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; 
import { db } from '../../lib/firebaseClient'; // Adjust path if necessary
import { useAuth } from '../../context/AuthContext'; // To get the current user

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  
  // State for all the new form fields
  const [name, setName] = useState('');
  const [style, setStyle] = useState('');
  const [capacity, setCapacity] = useState(0);
  const [currentMentees, setCurrentMentees] = useState(0);
  const [skillsToLearn, setSkillsToLearn] = useState('');
  const [skillsToTeach, setSkillsToTeach] = useState('');

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Helper function to parse skill strings into the required array format
  const parseSkills = (skillsString) => {
    if (!skillsString.trim()) return [];
    return skillsString.split(',')
      .map(pair => {
        const [skillName, level] = pair.split(':').map(s => s.trim());
        if (skillName && level) {
          return { name: skillName, level: level };
        }
        return null;
      })
      .filter(Boolean); // Removes any invalid or empty entries
  };

  // This function now CREATES A NEW DOCUMENT every time
  const handleProfileSave = async (e) => {
    e.preventDefault(); // Prevent form from reloading the page
    if (!user) {
      setMessage("You must be logged in to create a profile document.");
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      // Prepare the data for the new document
      const newProfileData = {
        name,
        style,
        capacity: Number(capacity),
        currentMentees: Number(currentMentees),
        skillsToLearn: parseSkills(skillsToLearn),
        skillsToTeach: parseSkills(skillsToTeach),
        // It's good practice to link it to the user who created it
        creatorId: user.uid,
        createdAt: serverTimestamp(),
      };

      // Use addDoc to ALWAYS create a new document in the 'users' collection
      const docRef = await addDoc(collection(db, "users"), newProfileData);

      setMessage(`New profile document created successfully! ID: ${docRef.id}`);
      
      // Optionally, clear the form after success
      setName('');
      setStyle('');
      setCapacity(0);
      setCurrentMentees(0);
      setSkillsToLearn('');
      setSkillsToTeach('');

    } catch (error)      {
      console.error("Error creating document: ", error);
      setMessage("Error creating document. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return <div className="text-center p-8">Loading user...</div>;
  }
  
  return (
    <main className="bg-amber-100 min-h-screen p-8 font-sans">
      <div className="max-w-2xl mx-auto bg-white/80 p-8 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-zinc-900 mb-6">Create New Profile Document</h1>
        <form onSubmit={handleProfileSave} className="space-y-4">
          <div>
            <label className="block text-zinc-700 font-bold mb-2" htmlFor="name">Full Name</label>
            <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border rounded-lg" placeholder="Priya Singh"/>
          </div>
          
          <div>
            <label className="block text-zinc-700 font-bold mb-2" htmlFor="style">Teaching Style</label>
            <input id="style" type="text" value={style} onChange={(e) => setStyle(e.target.value)} className="w-full px-3 py-2 border rounded-lg" placeholder="1-on-1"/>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-zinc-700 font-bold mb-2" htmlFor="capacity">Capacity</label>
              <input id="capacity" type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} className="w-full px-3 py-2 border rounded-lg"/>
            </div>
            <div>
              <label className="block text-zinc-700 font-bold mb-2" htmlFor="currentMentees">Current Mentees</label>
              <input id="currentMentees" type="number" value={currentMentees} onChange={(e) => setCurrentMentees(e.target.value)} className="w-full px-3 py-2 border rounded-lg"/>
            </div>
          </div>
          
          <div>
            <label className="block text-zinc-700 font-bold mb-2" htmlFor="skillsToTeach">Skills to Teach</label>
            <textarea id="skillsToTeach" value={skillsToTeach} onChange={(e) => setSkillsToTeach(e.target.value)} className="w-full px-3 py-2 border rounded-lg" placeholder="React:Expert, Node.js:Intermediate" rows="3"></textarea>
            <p className="text-xs text-zinc-500 mt-1">Format: Skill:Level, anotherSkill:Level</p>
          </div>

          <div>
            <label className="block text-zinc-700 font-bold mb-2" htmlFor="skillsToLearn">Skills to Learn</label>
            <textarea id="skillsToLearn" value={skillsToLearn} onChange={(e) => setSkillsToLearn(e.target.value)} className="w-full px-3 py-2 border rounded-lg" placeholder="Python:Beginner, SQL:Beginner" rows="3"></textarea>
            <p className="text-xs text-zinc-500 mt-1">Format: Skill:Level, anotherSkill:Level</p>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-amber-600 transition-colors disabled:bg-amber-300"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
          
          {message && <p className="text-center mt-4 text-sm font-semibold">{message}</p>}
        </form>
      </div>
    </main>
  );
}

