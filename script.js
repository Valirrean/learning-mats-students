
let currentRole = 'student';


function switchView(viewName, selectedRole) {
  

}

function handleSidebarClick(element, targetView) {
    document.querySelectorAll('.sidebar-list li').forEach(li => li.classList.remove('active'));
    element.classList.add('active');
    switchView(targetView, 'student'); 
}





let currentZIndex = 9999; 

function openModal(modalId, stack = true) {
    const overlay = document.getElementById('modal-overlay') || document.getElementById('modal-container');
    if (overlay) overlay.classList.remove('hidden');

    
    if (!stack) {
        document.querySelectorAll('.modal-content, .modal-box, .modal-confirmation, #modal-deactivate').forEach(modal => {
            modal.classList.add('hidden');
        });
        currentZIndex = 9999; 
    }

    
    const targetModal = document.getElementById(modalId);
    if (targetModal) {
        targetModal.classList.remove('hidden');
        
       
        currentZIndex += 10; 
        targetModal.style.zIndex = currentZIndex;
    }
}


function closeAllModals() {
    const overlay = document.getElementById('modal-overlay');
    const container = document.getElementById('modal-container');
    
    if (overlay) overlay.classList.add('hidden');
    if (container) container.classList.add('hidden');

    document.querySelectorAll('.modal-content, .modal-box, #modal-deactivate').forEach(modal => {
        modal.classList.add('hidden');
    });
}


function confirmAction() {
    closeAllModals();
}

function showSubjectDetails() {
    document.getElementById('view-subjects-list').classList.add('hidden');
    document.getElementById('view-subject-details').classList.remove('hidden');
}

function showSubjectsList() {
    document.getElementById('view-subject-details').classList.add('hidden');
    document.getElementById('view-subjects-list').classList.remove('hidden');
}


function toggleDropdown(event, dotElement) {
    event.stopPropagation(); 
    
    const menu = dotElement.nextElementSibling;
    
    document.querySelectorAll('.dropdown-menu').forEach(el => {
        if (el !== menu) el.classList.add('hidden');
    });

    menu.classList.toggle('hidden');
}

document.addEventListener('click', () => {
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.classList.add('hidden');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    
    // Setup Filter Dropdown
    setupDropdown('.sub-filter-btn', '.sub-filter-options', '.sub-filter-item', 'ALL SUBJECTS');

    // Setup Sort Dropdown
    setupDropdown('.sub-sort-btn', '.sub-sort-options', '.sub-sort-item', 'SORT BY..');

    function setupDropdown(btnSelector, dropdownSelector, itemSelector, defaultText) {
        const btn = document.querySelector(btnSelector);
        const dropdown = document.querySelector(dropdownSelector);
        const items = document.querySelectorAll(itemSelector);
        const btnSpan = btn ? btn.querySelector('span') : null;

        if (!btn || !dropdown) return;

        
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Close any other open dropdowns first
            document.querySelectorAll('.sub-filter-options, .sub-sort-options').forEach(menu => {
                if (menu !== dropdown) menu.classList.add('hidden');
            });
            
            dropdown.classList.toggle('hidden');
            btn.classList.toggle('active');
        });

       
        items.forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                const isSelected = item.classList.contains('active-filter');

                // Clear highlight from all items in this list
                items.forEach(i => i.classList.remove('active-filter'));

                if (isSelected) {
                    // DESELECT: Remove highlight & restore default button text
                    if (btnSpan) btnSpan.textContent = defaultText;
                } else {
                    // SELECT: Add highlight & update button text to selected item
                    item.classList.add('active-filter');
                    if (btnSpan) btnSpan.textContent = item.textContent;
                }

                // Close menu after selecting/deselecting
                dropdown.classList.add('hidden');
                btn.classList.remove('active');
            });
        });
    }

    
    document.addEventListener('click', () => {
        document.querySelectorAll('.sub-filter-options, .sub-sort-options').forEach(menu => {
            menu.classList.add('hidden');
        });
        document.querySelectorAll('.sub-filter-btn, .sub-sort-btn').forEach(btn => {
            btn.classList.remove('active');
        });
    });
});