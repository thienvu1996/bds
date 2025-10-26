// Data Manager for Admin Panel
class DataManager {
    constructor() {
        this.data = {
            projects: [],
            testimonials: [],
            contacts: []
        };
        this.loadData();
    }

    async loadData() {
        try {
            const [projectsRes, testimonialsRes, contactsRes] = await Promise.all([
                fetch('data/projects.json'),
                fetch('data/testimonials.json'),
                fetch('data/contacts.json')
            ]);

            this.data.projects = await projectsRes.json();
            this.data.testimonials = await testimonialsRes.json();
            this.data.contacts = await contactsRes.json();

            console.log('Data loaded successfully');
        } catch (error) {
            console.error('Error loading data:', error);
        }
    }

    // Projects management
    getProjects() {
        return this.data.projects;
    }

    addProject(project) {
        const newProject = {
            id: Date.now(),
            ...project,
            date: new Date().toISOString()
        };
        this.data.projects.push(newProject);
        this.saveData('projects');
        return newProject;
    }

    updateProject(id, updates) {
        const index = this.data.projects.findIndex(p => p.id === id);
        if (index !== -1) {
            this.data.projects[index] = { ...this.data.projects[index], ...updates };
            this.saveData('projects');
            return this.data.projects[index];
        }
        return null;
    }

    deleteProject(id) {
        const index = this.data.projects.findIndex(p => p.id === id);
        if (index !== -1) {
            this.data.projects.splice(index, 1);
            this.saveData('projects');
            return true;
        }
        return false;
    }

    // Testimonials management
    getTestimonials() {
        return this.data.testimonials;
    }

    addTestimonial(testimonial) {
        const newTestimonial = {
            id: Date.now(),
            ...testimonial,
            date: new Date().toISOString()
        };
        this.data.testimonials.push(newTestimonial);
        this.saveData('testimonials');
        return newTestimonial;
    }

    updateTestimonial(id, updates) {
        const index = this.data.testimonials.findIndex(t => t.id === id);
        if (index !== -1) {
            this.data.testimonials[index] = { ...this.data.testimonials[index], ...updates };
            this.saveData('testimonials');
            return this.data.testimonials[index];
        }
        return null;
    }

    deleteTestimonial(id) {
        const index = this.data.testimonials.findIndex(t => t.id === id);
        if (index !== -1) {
            this.data.testimonials.splice(index, 1);
            this.saveData('testimonials');
            return true;
        }
        return false;
    }

    // Contacts management
    getContacts() {
        return this.data.contacts;
    }

    addContact(contact) {
        const newContact = {
            id: Date.now(),
            ...contact,
            date: new Date().toISOString(),
            status: 'Chưa xử lý'
        };
        this.data.contacts.push(newContact);
        this.saveData('contacts');
        return newContact;
    }

    updateContact(id, updates) {
        const index = this.data.contacts.findIndex(c => c.id === id);
        if (index !== -1) {
            this.data.contacts[index] = { ...this.data.contacts[index], ...updates };
            this.saveData('contacts');
            return this.data.contacts[index];
        }
        return null;
    }

    deleteContact(id) {
        const index = this.data.contacts.findIndex(c => c.id === id);
        if (index !== -1) {
            this.data.contacts.splice(index, 1);
            this.saveData('contacts');
            return true;
        }
        return false;
    }

    // Save data (in real app, this would send to server)
    saveData(type) {
        // In a real application, you would send this to your backend API
        console.log(`Saving ${type}:`, this.data[type]);
        
        // For demo purposes, we'll just update the UI
        this.updateUI();
    }

    updateUI() {
        // Update dashboard stats
        this.updateDashboardStats();
        
        // Update tables
        this.updateProjectsTable();
        this.updateTestimonialsTable();
        this.updateContactsTable();
    }

    updateDashboardStats() {
        const totalProjects = document.getElementById('totalProjects');
        const totalContacts = document.getElementById('totalContacts');
        const totalTestimonials = document.getElementById('totalTestimonials');

        if (totalProjects) totalProjects.textContent = this.data.projects.length;
        if (totalContacts) totalContacts.textContent = this.data.contacts.length;
        if (totalTestimonials) totalTestimonials.textContent = this.data.testimonials.length;
    }

    updateProjectsTable() {
        const tableContent = document.querySelector('#projects .table-content');
        if (!tableContent) return;

        tableContent.innerHTML = this.data.projects.map(project => `
            <div class="data-item">
                <div><strong>${project.name}</strong><br>${project.category}</div>
                <div>${project.price}</div>
                <div>${project.status}</div>
                <div class="data-actions">
                    <button class="btn btn-primary btn-small" onclick="editProject(${project.id})">Sửa</button>
                    <button class="btn btn-outline btn-small" onclick="deleteProject(${project.id})">Xóa</button>
                </div>
            </div>
        `).join('');
    }

    updateTestimonialsTable() {
        const tableContent = document.querySelector('#testimonials .table-content');
        if (!tableContent) return;

        tableContent.innerHTML = this.data.testimonials.map(testimonial => `
            <div class="data-item">
                <div><strong>${testimonial.name}</strong><br>${'⭐'.repeat(testimonial.rating)}</div>
                <div>"${testimonial.comment.substring(0, 50)}..."</div>
                <div>${new Date(testimonial.date).toLocaleDateString('vi-VN')}</div>
                <div class="data-actions">
                    <button class="btn btn-primary btn-small" onclick="editTestimonial(${testimonial.id})">Sửa</button>
                    <button class="btn btn-outline btn-small" onclick="deleteTestimonial(${testimonial.id})">Xóa</button>
                </div>
            </div>
        `).join('');
    }

    updateContactsTable() {
        const tableContent = document.querySelector('#contacts .table-content');
        if (!tableContent) return;

        tableContent.innerHTML = this.data.contacts.map(contact => `
            <div class="data-item">
                <div><strong>${contact.name}</strong><br>${contact.email}</div>
                <div>${contact.subject}</div>
                <div>${new Date(contact.date).toLocaleDateString('vi-VN')}</div>
                <div class="data-actions">
                    <button class="btn btn-primary btn-small" onclick="viewContact(${contact.id})">Xem</button>
                    <button class="btn btn-outline btn-small" onclick="deleteContact(${contact.id})">Xóa</button>
                </div>
            </div>
        `).join('');
    }
}

// Initialize data manager
const dataManager = new DataManager();

// Global functions for admin panel
function editProject(id) {
    const project = dataManager.getProjects().find(p => p.id === id);
    if (project) {
        // Fill form with project data
        const form = document.querySelector('#projectForm form');
        if (form) {
            form.querySelector('input[type="text"]').value = project.name;
            form.querySelector('select').value = project.category;
            form.querySelector('textarea').value = project.description;
            // ... fill other fields
        }
        openModal('projectForm');
    }
}

function deleteProject(id) {
    if (confirm('Bạn có chắc chắn muốn xóa dự án này?')) {
        dataManager.deleteProject(id);
    }
}

function editTestimonial(id) {
    const testimonial = dataManager.getTestimonials().find(t => t.id === id);
    if (testimonial) {
        // Fill form with testimonial data
        const form = document.querySelector('#testimonialForm form');
        if (form) {
            form.querySelector('input[type="text"]').value = testimonial.name;
            form.querySelector('select').value = testimonial.rating;
            form.querySelector('textarea').value = testimonial.comment;
        }
        openModal('testimonialForm');
    }
}

function deleteTestimonial(id) {
    if (confirm('Bạn có chắc chắn muốn xóa đánh giá này?')) {
        dataManager.deleteTestimonial(id);
    }
}

function viewContact(id) {
    const contact = dataManager.getContacts().find(c => c.id === id);
    if (contact) {
        alert(`Tên: ${contact.name}\nEmail: ${contact.email}\nSĐT: ${contact.phone}\nChủ đề: ${contact.subject}\nTin nhắn: ${contact.message}`);
    }
}

function deleteContact(id) {
    if (confirm('Bạn có chắc chắn muốn xóa liên hệ này?')) {
        dataManager.deleteContact(id);
    }
}
