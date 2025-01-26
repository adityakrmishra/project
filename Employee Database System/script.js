(async function () {
    // Fetching employee data
    const fetchData = await fetch("data.json");
    const employees = await fetchData.json();
  
    let selectedEmployeeId = employees[0].id;
    let selectedEmployee = employees[0];
  
    // DOM elements
    const employeeList = document.querySelector(".employees__names--list");
    const employeeInfo = document.querySelector(".employees__single--info");
    const createEmployeeBtn = document.querySelector(".createEmployee");
    const addEmployeeModal = document.querySelector(".addEmployee");
    const addEmployeeForm = document.querySelector(".addEmployee_create");
    const dobInput = document.querySelector(".addEmployee_create--dob");
  
    // Event handlers
    createEmployeeBtn.addEventListener("click", () => {
        addEmployeeModal.style.display = "flex";
    });
  
    addEmployeeModal.addEventListener("click", (e) => {
        if (e.target.classList.contains("addEmployee")) {
            addEmployeeModal.style.display = "none";
        }
    });
  
    // Setting max age for employee to be minimum 18 years
    dobInput.max = `${new Date().getFullYear() - 18}-${new Date().toISOString().slice(5, 10)}`;
  
    addEmployeeForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const newEmployee = Object.fromEntries(new FormData(addEmployeeForm).entries());
        newEmployee.id = employees[employees.length - 1].id + 1;
        newEmployee.age = new Date().getFullYear() - parseInt(newEmployee.dob.slice(0, 4));
        newEmployee.imageUrl = newEmployee.imageUrl || "gfg.png";
        employees.push(newEmployee);
        addEmployeeForm.reset();
        addEmployeeModal.style.display = "none";
        renderEmployees();
    });
  
    // Handle employee selection and deletion using event delegation
    employeeList.addEventListener("click", (e) => {
        const targetId = e.target.closest('span')?.id;
        if (e.target.tagName === "SPAN" && selectedEmployeeId != targetId) {
            selectedEmployeeId = targetId;
            selectedEmployee = employees.find(emp => String(emp.id) === selectedEmployeeId);
            renderEmployees();
            renderSingleEmployee();
        }
  
        // Employee Delete Logic
        if (e.target.tagName === "I") {
            employees = employees.filter(emp => String(emp.id) !== e.target.parentNode.id);
            if (String(selectedEmployeeId) === e.target.parentNode.id) {
                selectedEmployeeId = employees[0]?.id || -1;
                selectedEmployee = employees[0] || {};
                renderSingleEmployee();
            }
            renderEmployees();
        }
    });
  
    // Function to render all employees
    const renderEmployees = () => {
        employeeList.innerHTML = employees.map(emp => `
            <span class="employees__names--item ${selectedEmployeeId == emp.id ? 'selected' : ''}" id="${emp.id}">
                ${emp.firstName} ${emp.lastName}
                <i class="employeeDelete">&#10060;</i>
            </span>`).join('');
    };
  
    // Function to render single selected employee details
    const renderSingleEmployee = () => {
        if (selectedEmployeeId === -1) {
            employeeInfo.innerHTML = "";
            return;
        }
        employeeInfo.innerHTML = `
            <img src="${selectedEmployee.imageUrl}" alt="Employee Photo"/>
            <span class="employees__single--heading">${selectedEmployee.firstName} ${selectedEmployee.lastName} (${selectedEmployee.age})</span>
            <span>${selectedEmployee.address}</span>
            <span>${selectedEmployee.email}</span>
            <span>Mobile - ${selectedEmployee.contactNumber}</span>
            <span>DOB - ${selectedEmployee.dob}</span>
        `;
    };
    
    // Initial render
    renderEmployees();
    renderSingleEmployee();
})();
