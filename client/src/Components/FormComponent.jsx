import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { FaSave } from 'react-icons/fa';

const FormComponent = ({ editableUser, onSave}) => {
    const [name, setName] = useState('');
    const [sectors, setSectors] = useState([]);
    const [selectedSectors, setSelectedSectors] = useState([]);
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [userId, setUserId] = useState(null);

    //  fetch all sectors in the form to select
    useEffect(() => {
        axios.get('https://user-management-server-iota-seven.vercel.app/sectors')
            .then(response => {
                setSectors(response.data.sectors);
            })
            .catch(error => console.error('Error fetching sectors: ', error));
    }, [])

    useEffect(() => {
        if(editableUser){
            setName(editableUser.name);
            setSelectedSectors(editableUser.sectors);
            setAgreedToTerms(editableUser.agreedToTerms);
        }else {
            // Reset form when not editing
            setName('');
            setSelectedSectors([]);
            setAgreedToTerms(false);
        }
    }, [editableUser])


    const handleSubmit = async (e) => {

        e.preventDefault();
        console.log('Reaching gere')
        if(!name || !selectedSectors.length || !agreedToTerms){
            alert('All the fields are mandatory');
            return;
        }

        const userData = {
            name,
            sectors: selectedSectors,
            agreedToTerms
        };

       onSave(userData, editableUser ? editableUser._id : null);

       // Reset form after saving (both for new and existing users)
        setName('');
        setSelectedSectors([]);
        setAgreedToTerms(false);
    };


    const handleSectorChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedSectors(selectedOptions);
    }





  return (
    <form onSubmit={handleSubmit} className="form-control w-full max-w-xs">
        <div className="mb-4">
            <label className='label'>
                <span className="label-text text-slate-950">Name:</span>
            </label>
            <input type="text" placeholder='Name' className="input bg-gray-200 text-slate-800 border-slate-200 input-bordered input-primary w-full max-w-xs" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div className="mb-4">
            <label className='label'>
                <span className="label-text text-slate-950">Sectors:</span>
            </label>
            <select multiple className="select select-bordered  bg-gray-200 text-slate-800 border-slate-200 select-primary w-full max-w-xs" value={selectedSectors} onChange={handleSectorChange}>
                {sectors.map(sector => (
                    <option key={sector.value} value={sector.label} style={{marginLeft: `${sector.indentation * 10}px`}}>
                        {sector.label}
                    </option>
                ))}
            </select>
        </div>
        <div className='mb-4 form-control'>
            <label className="label cursor-pointer">
                <input type="checkbox" className="toggle toggle-primary" checked={agreedToTerms} onChange={e => setAgreedToTerms(e.target.checked)} />
                <span className="label-text ml-1 text-gray-900">Agree to terms</span>
            </label>
        </div>
        <button className="btn btn-primary" type='submit'>
            {editableUser ? <FaSave className="mr-2" /> : ''}
            {editableUser ? 'Update' : 'Submit'}
        </button>
    </form>
  )
}

export default FormComponent