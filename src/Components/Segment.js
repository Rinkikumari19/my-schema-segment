import React, { useState, useEffect } from "react";

export default function Segment() {
    const [isOpen, setIsOpen] = useState(false)
    const [newSchema, setNewSchema] = useState('')
    const [schemaData, setSchemaData] = useState([])
    const [schemaObj, setSchemaObj] = useState({})

    useEffect = (() => {
        if ((localStorage.getItem('segmentData')) != null) {
            console.log("localstorage data")
            var data = JSON.parse(localStorage.getItem('segmentData'))
            setSchemaData(data)
        }

    }, [])


    function hangleChange(segmentValue) {
        if (segmentValue) {
            let segmentObj = {};
            setNewSchema(segmentValue)
            if (segmentValue == 'first_name') {
                segmentObj = { 'first_name': segmentValue }
            } else if (segmentValue == 'last_name') {
                segmentObj = { 'last_name': segmentValue }
            }
            else if (segmentValue == 'gender') {
                segmentObj = { 'gender': segmentValue }
            }
            else if (segmentValue == 'age') {
                segmentObj = { 'age': segmentValue }
            }
            else if (segmentValue == 'account_name') {
                segmentObj = { 'account_name': segmentValue }
            }
            else if (segmentValue == 'city') {
                segmentObj = { 'city': segmentValue }
            } else {
                segmentObj = { 'state': segmentValue }
            }
            setSchemaObj(segmentObj)
        }

        else {
            alert("Please select any value")
        }
    }

    function handleSubmit() {
        let segmentArr = schemaData;
        segmentArr.push(schemaObj)
        setSchemaData(segmentArr)
        setIsOpen(false)
        localStorage.setItem('segmentData', JSON.stringify(segmentArr))

    }
    function removeItem(i) {
        var removeSegment = []
        schemaData.map((ele, index) => {
            if (index == i) {

            } else {
                removeSegment.push(ele)
            }
        })
        setSchemaData(removeSegment)
        localStorage.setItem('segmentData', JSON.stringify(removeSegment))
    }

    return (
        <div className="main-div">
            <div className="nav">Saving Segment</div>
            <div style={{ padding: "20px" }}>
                <div>
                    <p>Enter the name of the segment</p>
                    <input type='text' placeholder="Name of the segment" />
                </div>
                <div>
                    <p>To save your segment. You need to add the sechmas to build the query.</p>
                </div>
                <div className="traits">
                    <div className="d-flex">
                        <p className="dot green"></p>
                        <p>User Traits</p>
                    </div>
                    <div className="d-flex">
                        <p className="dot"></p>
                        <p>Group Traits</p>
                    </div>
                </div>
                <div className="schema-div">
                    {schemaData.map((ele, index) => {
                        return (
                            <div className="d-flex justify-space-arround">
                                <p className={index % 2 == 0 ? "dot green" : "dot"}></p>
                                <select>
                                    <option value='first_name' selected={(ele.first_name) ? true : false}>First Name</option>
                                    <option value='last_name' selected={(ele.lastt_name) ? true : false} >Last Name</option>
                                    <option value='gender' selected={(ele.gender) ? true : false}>Gender</option>
                                    <option value='age' selected={(ele.age) ? true : false}>Age</option>
                                    <option value='account_name' selected={(ele.account_name) ? true : false}>Account Name</option>
                                    <option value='city' selected={(ele.city) ? true : false}>City</option>
                                    <option value='state' selected={(ele.state) ? true : false}>State</option>
                                </select>
                                <div className='sigment-remove' onClick={() => removeItem(index)}> - </div>
                            </div>
                        )
                    })}

                </div>
                {isOpen ?
                    <div className="d-flex justify-space-arround add-schema">
                        <p className="dot gray"></p>
                        <select onChange={(e) => hangleChange(e.target.value)}>
                            <option value=''>Add schema to segment</option>
                            <option value='first_name'>First Name</option>
                            <option value='last_name'>Last Name</option>
                            <option value='gender'>Gender</option>
                            <option value='age'>Age</option>
                            <option value='account_name'>Account Name</option>
                            <option value='city'>City</option>
                            <option value='state'>State</option>
                        </select>
                        <div className='sigment-remove' onClick={() => setIsOpen(false)}> - </div>
                    </div>

                    : null
                }

                <div className="add-new-schema" onClick={() => setIsOpen(true)}>
                    <p><u>+Add new schema</u></p>
                </div>
                <div className="nav gray">
                    <button className="btn" onClick={handleSubmit}>Save the segment</button>
                    <button className="btn cancel" onClick={() => setIsOpen(false)}>Cancel</button>
                </div>
            </div>
        </div>

    )
}