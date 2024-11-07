// Get DOM elements
        const globeIcon = document.querySelector('.globe-icon');
        const modal = document.getElementById('regionModal');
        const closeBtn = modal.querySelector('.close-btn');
        const saveBtn = modal.querySelector('.save-btn');
        const regionSelect = document.getElementById('region');
        const currencySelect = document.getElementById('currency');

        // Region to currency mapping
        const regionCurrencyMap = {
            'PT': 'EUR',
            'US': 'USD',
            'UK': 'GBP',
            'ES': 'EUR',
            'FR': 'EUR',
            'DE': 'EUR'
        };

        // Region names mapping
        const regionNames = {
            'PT': 'Portugal',
            'US': 'United States',
            'UK': 'United Kingdom',
            'ES': 'Spain',
            'FR': 'France',
            'DE': 'Germany'
        };

        // Update currency based on region selection
        regionSelect.addEventListener('change', (e) => {
            const selectedRegion = e.target.value;
            const currency = regionCurrencyMap[selectedRegion];
            currencySelect.value = currency;
        });

        // Show modal when globe icon is clicked
        globeIcon.addEventListener('click', (e) => {
            e.preventDefault();
            modal.style.display = 'block';
        });

        // Close modal when close button is clicked
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });

        // Handle save button click
        saveBtn.addEventListener('click', () => {
            const selectedRegion = regionSelect.value;
            const selectedCurrency = currencySelect.value;
            
            // Update the globe icon text
            globeIcon.innerHTML = `🌎 ${regionNames[selectedRegion]}`;
            
            // Log the selected values
            console.log('Selected Region:', selectedRegion);
            console.log('Selected Currency:', selectedCurrency);
            
            // Close the modal
            modal.style.display = 'none';
        });

        // Set initial currency based on default region
        window.addEventListener('DOMContentLoaded', () => {
            const initialRegion = regionSelect.value;
            currencySelect.value = regionCurrencyMap[initialRegion];
        });