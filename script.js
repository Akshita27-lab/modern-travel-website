// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close mobile menu when clicking on a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.add('hidden');
            }
        });
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-bg');
    if (parallax && window.innerWidth > 768) { // Only on desktop
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('slide-in');
        }
    });
}, observerOptions);

// Observe all destination cards and sections
document.querySelectorAll('.destination-card, section').forEach(el => {
    if (el) {
        observer.observe(el);
    }
});

// Travel Planner Form
const travelForm = document.getElementById('travelForm');
const resultsDiv = document.getElementById('results');
const planContent = document.getElementById('planContent');

if (travelForm) {
    travelForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const destination = document.getElementById('destination').value;
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        const travelers = document.getElementById('travelers').value;
        const budget = document.querySelector('input[name="budget"]:checked')?.value;
        const interests = Array.from(document.querySelectorAll('input[name="interests"]:checked'))
                              .map(cb => cb.value);

        // Validate form
        if (!destination || !startDate || !endDate || !budget) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        // Validate dates
        const start = new Date(startDate);
        const end = new Date(endDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (start < today) {
            showNotification('Start date cannot be in the past', 'error');
            return;
        }
        
        if (end <= start) {
            showNotification('End date must be after start date', 'error');
            return;
        }

        // Show loading state
        const submitBtn = travelForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Generating Plan...';
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            generateTravelPlan(destination, startDate, endDate, travelers, budget, interests);
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

function generateTravelPlan(destination, startDate, endDate, travelers, budget, interests) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

    // Sample activities based on interests
    const activities = {
        culture: ['Visit museums', 'Explore historical sites', 'Attend local festivals', 'Take guided tours'],
        adventure: ['Hiking trails', 'Water sports', 'Rock climbing', 'Zip lining'],
        food: ['Cooking classes', 'Food tours', 'Wine tasting', 'Local market visits'],
        nature: ['National parks', 'Wildlife watching', 'Botanical gardens', 'Scenic drives']
    };

    // Nearby places data with photos and rates in INR
    const nearbyPlaces = {
        paris: [
            {
                name: 'Versailles Palace',
                description: 'Magnificent royal palace with stunning gardens',
                photos: [
                    'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1502602898536-47ad22581b52?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                ],
                rate: '₹2,500',
                distance: '20 km',
                rating: '4.8'
            },
            {
                name: 'Disneyland Paris',
                description: 'Magical theme park for all ages',
                photos: [
                    'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1538970272646-f61fabb3a8a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                ],
                rate: '₹4,200',
                distance: '32 km',
                rating: '4.6'
            },
            {
                name: 'Giverny Gardens',
                description: 'Monet\'s beautiful water lily gardens',
                photos: [
                    'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1587595431973-160d0d94add1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                ],
                rate: '₹1,800',
                distance: '75 km',
                rating: '4.7'
            }
        ],
        tokyo: [
            {
                name: 'Mount Fuji',
                description: 'Japan\'s iconic sacred mountain',
                photos: [
                    'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1542051841857-5f90071e7989?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                ],
                rate: '₹3,500',
                distance: '100 km',
                rating: '4.9'
            },
            {
                name: 'Hakone Hot Springs',
                description: 'Relaxing hot spring resort town',
                photos: [
                    'https://images.unsplash.com/photo-1508009603885-50cf7c079365?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1553603229-0f1a5d2c735c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                ],
                rate: '₹5,200',
                distance: '85 km',
                rating: '4.8'
            },
            {
                name: 'Nikko Temples',
                description: 'UNESCO World Heritage site with ancient temples',
                photos: [
                    'https://images.unsplash.com/photo-1539066599990-c5cc2f0e05c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                ],
                rate: '₹2,800',
                distance: '140 km',
                rating: '4.7'
            }
        ],
        bali: [
            {
                name: 'Ubud Sacred Monkey Forest',
                description: 'Sacred sanctuary with playful monkeys',
                photos: [
                    'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1587595431973-160d0d94add1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                ],
                rate: '₹400',
                distance: '35 km',
                rating: '4.6'
            },
            {
                name: 'Tanah Lot Temple',
                description: 'Iconic sea temple on rocky outcrop',
                photos: [
                    'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1508009603885-50cf7c079365?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                ],
                rate: '₹650',
                distance: '20 km',
                rating: '4.8'
            },
            {
                name: 'Rice Terraces',
                description: 'Ancient agricultural landscapes',
                photos: [
                    'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1553603229-0f1a5d2c735c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1539066599990-c5cc2f0e05c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                ],
                rate: '₹300',
                distance: '25 km',
                rating: '4.7'
            }
        ],
        santorini: [
            {
                name: 'Oia Sunset',
                description: 'Most beautiful sunset in the world',
                photos: [
                    'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1587595431973-160d0d94add1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                ],
                rate: '₹0',
                distance: '12 km',
                rating: '5.0'
            },
            {
                name: 'Fira Town',
                description: 'Capital with stunning caldera views',
                photos: [
                    'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1508009603885-50cf7c079365?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                ],
                rate: '₹0',
                distance: '0 km',
                rating: '4.9'
            },
            {
                name: 'Red Beach',
                description: 'Unique volcanic sand beach',
                photos: [
                    'https://images.unsplash.com/photo-1553603229-0f1a5d2c735c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1539066599990-c5cc2f0e05c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                ],
                rate: '₹0',
                distance: '8 km',
                rating: '4.6'
            }
        ],
        dubai: [
            {
                name: 'Burj Khalifa',
                description: 'World\'s tallest building',
                photos: [
                    'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1587595431973-160d0d94add1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                ],
                rate: '₹2,900',
                distance: '0 km',
                rating: '4.8'
            },
            {
                name: 'Palm Jumeirah',
                description: 'Man-made palm-shaped island',
                photos: [
                    'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1508009603885-50cf7c079365?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1553603229-0f1a5d2c735c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                ],
                rate: '₹0',
                distance: '25 km',
                rating: '4.5'
            },
            {
                name: 'Dubai Mall',
                description: 'World\'s largest shopping mall',
                photos: [
                    'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1539066599990-c5cc2f0e05c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                ],
                rate: '₹0',
                distance: '2 km',
                rating: '4.4'
            }
        ],
        newyork: [
            {
                name: 'Central Park',
                description: 'Urban oasis in the heart of Manhattan',
                photos: [
                    'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1538970272646-f61fabb3a8a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                ],
                rate: '₹0',
                distance: '0 km',
                rating: '4.9'
            },
            {
                name: 'Statue of Liberty',
                description: 'Iconic symbol of freedom',
                photos: [
                    'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1587595431973-160d0d94add1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                ],
                rate: '₹2,000',
                distance: '5 km',
                rating: '4.7'
            },
            {
                name: 'Brooklyn Bridge',
                description: 'Historic suspension bridge',
                photos: [
                    'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1508009603885-50cf7c079365?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1553603229-0f1a5d2c735c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                ],
                rate: '₹0',
                distance: '3 km',
                rating: '4.6'
            }
        ],
        sydney: [
            {
                name: 'Bondi Beach',
                description: 'Famous surf beach',
                photos: [
                    'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1508009603885-50cf7c079365?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                ],
                rate: '₹0',
                distance: '7 km',
                rating: '4.8'
            },
            {
                name: 'Sydney Harbor Bridge',
                description: 'Iconic steel arch bridge',
                photos: [
                    'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1553603229-0f1a5d2c735c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1539066599990-c5cc2f0e05c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                ],
                rate: '₹16,600',
                distance: '2 km',
                rating: '4.7'
            },
            {
                name: 'Blue Mountains',
                description: 'UNESCO World Heritage site',
                photos: [
                    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1502602898536-47ad22581b52?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                ],
                rate: '₹1,200',
                distance: '80 km',
                rating: '4.9'
            }
        ],
        venice: [
            {
                name: 'St. Mark\'s Basilica',
                description: 'Magnificent cathedral',
                photos: [
                    'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1508009603885-50cf7c079365?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                ],
                rate: '₹250',
                distance: '0 km',
                rating: '4.8'
            },
            {
                name: 'Gondola Ride',
                description: 'Traditional Venetian transport',
                photos: [
                    'https://images.unsplash.com/photo-1553603229-0f1a5d2c735c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1539066599990-c5cc2f0e05c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                ],
                rate: '₹6,640',
                distance: '0 km',
                rating: '4.5'
            },
            {
                name: 'Murano Island',
                description: 'Famous for glass making',
                photos: [
                    'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1502602898536-47ad22581b52?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                ],
                rate: '₹500',
                distance: '8 km',
                rating: '4.6'
            }
        ],
        capetown: [
            {
                name: 'Table Mountain',
                description: 'Iconic flat-topped mountain',
                photos: [
                    'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1508009603885-50cf7c079365?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1553603229-0f1a5d2c735c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                ],
                rate: '₹2,100',
                distance: '5 km',
                rating: '4.9'
            },
            {
                name: 'Robben Island',
                description: 'Historic prison island',
                photos: [
                    'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1539066599990-c5cc2f0e05c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                ],
                rate: '₹2,500',
                distance: '12 km',
                rating: '4.7'
            },
            {
                name: 'Cape of Good Hope',
                description: 'Southernmost point of Africa',
                photos: [
                    'https://images.unsplash.com/photo-1502602898536-47ad22581b52?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                ],
                rate: '₹1,200',
                distance: '45 km',
                rating: '4.8'
            }
        ],
        bangkok: [
            {
                name: 'Grand Palace',
                description: 'Royal residence complex',
                photos: [
                    'https://images.unsplash.com/photo-1508009603885-50cf7c079365?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1553603229-0f1a5d2c735c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                ],
                rate: '₹1,200',
                distance: '0 km',
                rating: '4.7'
            },
            {
                name: 'Wat Phra Kaew',
                description: 'Temple of the Emerald Buddha',
                photos: [
                    'https://images.unsplash.com/photo-1539066599990-c5cc2f0e05c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1502602898536-47ad22581b52?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                ],
                rate: '₹1,200',
                distance: '0 km',
                rating: '4.8'
            },
            {
                name: 'Chatuchak Market',
                description: 'World\'s largest weekend market',
                photos: [
                    'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1502602898536-47ad22581b52?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                ],
                rate: '₹0',
                distance: '15 km',
                rating: '4.5'
            }
        ],
        rio: [
            {
                name: 'Christ the Redeemer',
                description: 'Iconic statue on Corcovado',
                photos: [
                    'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1553603229-0f1a5d2c735c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1539066599990-c5cc2f0e05c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                ],
                rate: '₹1,200',
                distance: '8 km',
                rating: '4.9'
            },
            {
                name: 'Copacabana Beach',
                description: 'Famous beach and promenade',
                photos: [
                    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1502602898536-47ad22581b52?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                ],
                rate: '₹0',
                distance: '5 km',
                rating: '4.8'
            },
            {
                name: 'Sugarloaf Mountain',
                description: 'Granite peak with cable car',
                photos: [
                    'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1508009603885-50cf7c079365?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1553603229-0f1a5d2c735c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                ],
                rate: '₹2,100',
                distance: '12 km',
                rating: '4.7'
            }
        ],
        marrakech: [
            {
                name: 'Jemaa el-Fnaa',
                description: 'Famous square and market',
                photos: [
                    'https://images.unsplash.com/photo-1553603229-0f1a5d2c735c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1539066599990-c5cc2f0e05c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                ],
                rate: '₹0',
                distance: '0 km',
                rating: '4.6'
            },
            {
                name: 'Bahia Palace',
                description: '19th-century palace',
                photos: [
                    'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1502602898536-47ad22581b52?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                ],
                rate: '₹580',
                distance: '2 km',
                rating: '4.5'
            },
            {
                name: 'Majorelle Garden',
                description: 'Botanical garden and villa',
                photos: [
                    'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1508009603885-50cf7c079365?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1553603229-0f1a5d2c735c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                ],
                rate: '₹660',
                distance: '5 km',
                rating: '4.7'
            }
        ],
        singapore: [
            {
                name: 'Gardens by the Bay',
                description: 'Futuristic nature park',
                photos: [
                    'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1539066599990-c5cc2f0e05c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                ],
                rate: '₹2,300',
                distance: '5 km',
                rating: '4.8'
            },
            {
                name: 'Marina Bay Sands',
                description: 'Iconic hotel and casino',
                photos: [
                    'https://images.unsplash.com/photo-1502602898536-47ad22581b52?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                ],
                rate: '₹0',
                distance: '3 km',
                rating: '4.6'
            },
            {
                name: 'Sentosa Island',
                description: 'Entertainment and resort island',
                photos: [
                    'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1508009603885-50cf7c079365?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1553603229-0f1a5d2c735c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                ],
                rate: '₹330',
                distance: '8 km',
                rating: '4.5'
            }
        ],
        iceland: [
            {
                name: 'Northern Lights',
                description: 'Aurora borealis display',
                photos: [
                    'https://images.unsplash.com/photo-1539066599990-c5cc2f0e05c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1502602898536-47ad22581b52?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                ],
                rate: '₹0',
                distance: '0 km',
                rating: '5.0'
            },
            {
                name: 'Blue Lagoon',
                description: 'Geothermal spa',
                photos: [
                    'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1502602898536-47ad22581b52?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                ],
                rate: '₹6,640',
                distance: '50 km',
                rating: '4.9'
            },
            {
                name: 'Golden Circle',
                description: 'Popular tourist route',
                photos: [
                    'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1508009603885-50cf7c079365?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1553603229-0f1a5d2c735c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                ],
                rate: '₹8,300',
                distance: '100 km',
                rating: '4.8'
            }
        ],
        machupicchu: [
            {
                name: 'Machu Picchu Citadel',
                description: 'Ancient Incan ruins',
                photos: [
                    'https://images.unsplash.com/photo-1587595431973-160d0d94add1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                ],
                rate: '₹3,700',
                distance: '0 km',
                rating: '5.0'
            },
            {
                name: 'Inca Trail',
                description: 'Famous hiking route',
                photos: [
                    'https://images.unsplash.com/photo-1508009603885-50cf7c079365?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1553603229-0f1a5d2c735c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                ],
                rate: '₹41,500',
                distance: '0 km',
                rating: '4.9'
            },
            {
                name: 'Sacred Valley',
                description: 'Beautiful Andean valley',
                photos: [
                    'https://images.unsplash.com/photo-1539066599990-c5cc2f0e05c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1502602898536-47ad22581b52?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                ],
                rate: '₹2,500',
                distance: '25 km',
                rating: '4.7'
            }
        ]
    };

    // Get nearby places for the destination
    const places = nearbyPlaces[destination.toLowerCase()] || [];

    // Generate itinerary
    let itinerary = '';
    for (let day = 1; day <= Math.min(days, 7); day++) {
        itinerary += `
            <div class="bg-gray-50 rounded-lg p-4 mb-4">
                <h4 class="font-bold text-lg mb-2">Day ${day}</h4>
                <ul class="space-y-2">
        `;
        
        // Add activities based on interests
        interests.forEach(interest => {
            if (activities[interest]) {
                const activity = activities[interest][Math.floor(Math.random() * activities[interest].length)];
                itinerary += `<li class="flex items-center"><i class="fas fa-check-circle text-green-500 mr-2"></i>${activity}</li>`;
            }
        });
        
        // Add some default activities
        if (day === 1) {
            itinerary += `<li class="flex items-center"><i class="fas fa-check-circle text-green-500 mr-2"></i>Check into accommodation</li>`;
            itinerary += `<li class="flex items-center"><i class="fas fa-check-circle text-green-500 mr-2"></i>Explore local area</li>`;
        }
        
        itinerary += `
                </ul>
            </div>
        `;
    }

    // Calculate estimated budget in INR (1 USD ≈ 83 INR)
    const budgetRanges = {
        budget: { accommodation: 4150, food: 2490, activities: 3320, transport: 1660 },
        moderate: { accommodation: 8300, food: 4980, activities: 6640, transport: 3320 },
        luxury: { accommodation: 16600, food: 9960, activities: 12450, transport: 6640 },
        premium: { accommodation: 24900, food: 16600, activities: 20750, transport: 9960 }
    };

    const dailyBudget = budgetRanges[budget];
    const totalBudget = (dailyBudget.accommodation + dailyBudget.food + dailyBudget.activities + dailyBudget.transport) * days * parseInt(travelers);

    // Generate nearby places HTML
    let nearbyPlacesHTML = '';
    if (places.length > 0) {
        nearbyPlacesHTML = `
            <div class="mt-8">
                <h4 class="font-bold text-2xl mb-6 gradient-text">Nearby Places to Visit</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        `;
        
        places.forEach(place => {
            nearbyPlacesHTML += `
                <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <div class="relative">
                        <div class="flex overflow-x-auto space-x-2 p-4 bg-gray-100">
                            ${place.photos.map(photo => `
                                <img src="${photo}" alt="${place.name}" class="w-32 h-24 object-cover rounded-lg flex-shrink-0">
                            `).join('')}
                        </div>
                        <div class="absolute top-2 right-2 bg-yellow-400 text-black px-2 py-1 rounded-full text-sm font-bold">
                            ${place.rating} ★
                        </div>
                    </div>
                    <div class="p-4">
                        <h5 class="font-bold text-lg mb-2">${place.name}</h5>
                        <p class="text-gray-600 text-sm mb-3">${place.description}</p>
                        <div class="flex justify-between items-center">
                            <span class="text-green-600 font-bold text-lg">${place.rate}</span>
                            <span class="text-blue-600 text-sm">${place.distance}</span>
                        </div>
                        <button class="w-full mt-3 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                            <i class="fas fa-map-marker-alt mr-2"></i>View Details
                        </button>
                    </div>
                </div>
            `;
        });
        
        nearbyPlacesHTML += `
                </div>
            </div>
        `;
    }

    // Create plan content
    const planHTML = `
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
                <h4 class="font-bold text-lg mb-4">Trip Summary</h4>
                <div class="space-y-3">
                    <div class="flex justify-between">
                        <span class="text-gray-600">Destination:</span>
                        <span class="font-semibold">${destination}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">Duration:</span>
                        <span class="font-semibold">${days} days</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">Travelers:</span>
                        <span class="font-semibold">${travelers}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">Budget Level:</span>
                        <span class="font-semibold capitalize">${budget}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">Estimated Cost:</span>
                        <span class="font-semibold text-green-600">₹${totalBudget.toLocaleString()}</span>
                    </div>
                </div>
                
                <div class="mt-6">
                    <h4 class="font-bold text-lg mb-4">Interests</h4>
                    <div class="flex flex-wrap gap-2">
                        ${interests.map(interest => 
                            `<span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">${interest}</span>`
                        ).join('')}
                    </div>
                </div>
            </div>
            
            <div>
                <h4 class="font-bold text-lg mb-4">Daily Itinerary</h4>
                ${itinerary}
            </div>
        </div>
        
        ${nearbyPlacesHTML}
        
        <div class="mt-8 flex flex-col sm:flex-row gap-4">
            <button class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                <i class="fas fa-download mr-2"></i>Download PDF
            </button>
            <button class="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
                <i class="fas fa-share mr-2"></i>Share Plan
            </button>
            <button class="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors">
                <i class="fas fa-edit mr-2"></i>Edit Plan
            </button>
        </div>
    `;

    planContent.innerHTML = planHTML;
    resultsDiv.classList.remove('hidden');
    resultsDiv.scrollIntoView({ behavior: 'smooth' });
    
    showNotification('Travel plan generated successfully!', 'success');
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transform transition-all duration-300 translate-x-full`;
    
    const colors = {
        success: 'bg-green-500 text-white',
        error: 'bg-red-500 text-white',
        info: 'bg-blue-500 text-white'
    };
    
    notification.className += ` ${colors[type]}`;
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'} mr-2"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// 3D card effect enhancement
document.querySelectorAll('.card-3d').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
});

// Destination card hover effects
document.querySelectorAll('.destination-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
        card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    });
});

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.md\\:hidden');
const mobileMenu = document.createElement('div');
mobileMenu.className = 'fixed inset-0 bg-black bg-opacity-50 z-40 hidden';
mobileMenu.innerHTML = `
    <div class="bg-white w-64 h-full p-6">
        <div class="flex justify-between items-center mb-8">
            <div class="flex items-center space-x-2">
                <i class="fas fa-globe-americas text-2xl text-blue-500"></i>
                <span class="text-xl font-bold">TravelPlanner</span>
            </div>
            <button class="text-gray-700" onclick="closeMobileMenu()">
                <i class="fas fa-times text-xl"></i>
            </button>
        </div>
        <nav class="space-y-4">
            <a href="#home" class="block text-gray-700 hover:text-blue-500 transition-colors" onclick="closeMobileMenu()">Home</a>
            <a href="#destinations" class="block text-gray-700 hover:text-blue-500 transition-colors" onclick="closeMobileMenu()">Destinations</a>
            <a href="#planner" class="block text-gray-700 hover:text-blue-500 transition-colors" onclick="closeMobileMenu()">Planner</a>
            <a href="#about" class="block text-gray-700 hover:text-blue-500 transition-colors" onclick="closeMobileMenu()">About</a>
        </nav>
    </div>
`;

document.body.appendChild(mobileMenu);

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('hidden');
    });
}

function closeMobileMenu() {
    mobileMenu.classList.add('hidden');
}

// Close mobile menu when clicking outside
mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) {
        closeMobileMenu();
    }
});

// Add some interactive elements
document.addEventListener('DOMContentLoaded', () => {
    // Add floating particles to hero section
    const hero = document.querySelector('.hero-bg');
    if (hero) {
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'absolute w-2 h-2 bg-white rounded-full opacity-30';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animation = `float ${3 + Math.random() * 4}s ease-in-out infinite`;
            particle.style.animationDelay = Math.random() * 2 + 's';
            hero.appendChild(particle);
        }
    }

    // Add typing effect to hero title
    const heroTitle = document.querySelector('#home h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        setTimeout(typeWriter, 1000);
    }
});

// Add scroll progress indicator
const progressBar = document.createElement('div');
progressBar.className = 'fixed top-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 z-50 transition-all duration-300';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = scrolled + '%';
});

// Add some Easter eggs
let clickCount = 0;
document.addEventListener('click', () => {
    clickCount++;
    if (clickCount === 10) {
        showNotification('🎉 You found the secret! You\'re a true explorer!', 'success');
        clickCount = 0;
    }
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'p') {
        e.preventDefault();
        document.getElementById('planner').scrollIntoView({ behavior: 'smooth' });
    }
});

// Function to open destination pages in modal
function openDestination(destination) {
    const destinationData = {
        'paris': {
            name: 'Paris, France',
            subtitle: 'City of Love',
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            price: '₹1,20,000',
            rating: '4.9',
            description: 'Experience the magic of the Eiffel Tower, Louvre Museum, and charming streets of Montmartre. Paris offers world-class cuisine, iconic landmarks, and romantic atmosphere.',
            highlights: ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame Cathedral', 'Champs-Élysées', 'Montmartre'],
            duration: '5-7 days',
            bestTime: 'April to October',
            included: ['Hotel accommodation', 'Daily breakfast', 'Airport transfers', 'City tour', 'Museum passes'],
            nearbyPlaces: [
                { name: 'Versailles Palace', rate: '₹2,500', distance: '20 km' },
                { name: 'Disneyland Paris', rate: '₹4,200', distance: '32 km' },
                { name: 'Giverny Gardens', rate: '₹1,800', distance: '75 km' }
            ]
        },
        'tokyo': {
            name: 'Tokyo, Japan',
            subtitle: 'Land of Rising Sun',
            image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            price: '₹1,50,000',
            rating: '4.8',
            description: 'Discover the perfect blend of tradition and innovation in Tokyo. From ancient temples to cutting-edge technology, experience the best of Japanese culture.',
            highlights: ['Shibuya Crossing', 'Senso-ji Temple', 'Tokyo Skytree', 'Tsukiji Market', 'Harajuku'],
            duration: '6-8 days',
            bestTime: 'March to May, September to November',
            included: ['Hotel accommodation', 'Daily breakfast', 'JR Pass', 'Guided tours', 'Metro cards'],
            nearbyPlaces: [
                { name: 'Mount Fuji', rate: '₹3,500', distance: '100 km' },
                { name: 'Hakone Hot Springs', rate: '₹5,200', distance: '85 km' },
                { name: 'Nikko Temples', rate: '₹2,800', distance: '140 km' }
            ]
        },
        'bali': {
            name: 'Bali, Indonesia',
            subtitle: 'Island of Gods',
            image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            price: '₹85,000',
            rating: '4.7',
            description: 'Immerse yourself in the spiritual and natural beauty of Bali. From pristine beaches to sacred temples, experience paradise on earth.',
            highlights: ['Ubud Sacred Monkey Forest', 'Tanah Lot Temple', 'Rice Terraces', 'Beach Clubs', 'Traditional Dance'],
            duration: '7-10 days',
            bestTime: 'April to October',
            included: ['Villa accommodation', 'Daily breakfast', 'Airport transfers', 'Temple tours', 'Spa sessions'],
            nearbyPlaces: [
                { name: 'Ubud Sacred Monkey Forest', rate: '₹400', distance: '35 km' },
                { name: 'Tanah Lot Temple', rate: '₹650', distance: '20 km' },
                { name: 'Rice Terraces', rate: '₹300', distance: '25 km' }
            ]
        },
        'santorini': {
            name: 'Santorini, Greece',
            subtitle: 'Aegean Paradise',
            image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            price: '₹1,35,000',
            rating: '4.9',
            description: 'Experience the most beautiful sunsets in the world from the iconic white-washed buildings of Santorini. A romantic paradise in the Aegean Sea.',
            highlights: ['Oia Sunset', 'Fira Town', 'Red Beach', 'Wine Tours', 'Caldera Views'],
            duration: '5-7 days',
            bestTime: 'June to September',
            included: ['Cave hotel accommodation', 'Daily breakfast', 'Airport transfers', 'Sunset cruise', 'Wine tasting'],
            nearbyPlaces: [
                { name: 'Oia Sunset', rate: '₹0', distance: '12 km' },
                { name: 'Fira Town', rate: '₹0', distance: '0 km' },
                { name: 'Red Beach', rate: '₹0', distance: '15 km' }
            ]
        },
        'newyork': {
            name: 'New York City, USA',
            subtitle: 'The Big Apple',
            image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            price: '₹1,80,000',
            rating: '4.6',
            description: 'The city that never sleeps offers endless entertainment, world-class dining, and iconic landmarks that define American culture.',
            highlights: ['Times Square', 'Statue of Liberty', 'Central Park', 'Broadway Shows', 'Empire State Building'],
            duration: '6-8 days',
            bestTime: 'April to June, September to November',
            included: ['Hotel accommodation', 'Daily breakfast', 'Airport transfers', 'City passes', 'Broadway tickets'],
            nearbyPlaces: [
                { name: 'Niagara Falls', rate: '₹8,500', distance: '400 km' },
                { name: 'Washington DC', rate: '₹12,000', distance: '330 km' },
                { name: 'Boston', rate: '₹10,500', distance: '300 km' }
            ]
        },
        'dubai': {
            name: 'Dubai, UAE',
            subtitle: 'City of Gold',
            image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            price: '₹95,000',
            rating: '4.5',
            description: 'Experience luxury and innovation in the heart of the desert. From towering skyscrapers to traditional souks, Dubai offers the best of both worlds.',
            highlights: ['Burj Khalifa', 'Palm Jumeirah', 'Dubai Mall', 'Desert Safari', 'Gold Souk'],
            duration: '5-7 days',
            bestTime: 'November to March',
            included: ['Luxury hotel accommodation', 'Daily breakfast', 'Airport transfers', 'Desert safari', 'City tour'],
            nearbyPlaces: [
                { name: 'Abu Dhabi', rate: '₹3,500', distance: '140 km' },
                { name: 'Sharjah', rate: '₹1,200', distance: '30 km' },
                { name: 'Al Ain', rate: '₹2,800', distance: '160 km' }
            ]
        },
        'venice': {
            name: 'Venice, Italy',
            subtitle: 'Floating City',
            image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            price: '₹1,30,000',
            rating: '4.8',
            description: 'Romantic gondola rides, historic architecture, and timeless beauty make Venice one of the most enchanting cities in the world.',
            highlights: ['St. Mark\'s Basilica', 'Grand Canal', 'Rialto Bridge', 'Murano Island', 'Gondola Rides'],
            duration: '4-6 days',
            bestTime: 'April to June, September to October',
            included: ['Hotel accommodation', 'Daily breakfast', 'Airport transfers', 'Gondola ride', 'Island tours'],
            nearbyPlaces: [
                { name: 'Verona', rate: '₹2,800', distance: '120 km' },
                { name: 'Padua', rate: '₹1,500', distance: '40 km' },
                { name: 'Treviso', rate: '₹1,200', distance: '30 km' }
            ]
        }
    };
    
    const data = destinationData[destination];
    if (data) {
        showDestinationModal(data);
    } else {
        showNotification('Destination details coming soon!', 'info');
    }
}

function showDestinationModal(data) {
    const modal = document.getElementById('destinationModal');
    const content = document.getElementById('destinationModalContent');
    
    content.innerHTML = `
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Left Column - Image and Basic Info -->
            <div>
                <div class="relative h-80 rounded-2xl overflow-hidden mb-6">
                    <img src="${data.image}" alt="${data.name}" class="w-full h-full object-cover">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div class="absolute bottom-4 left-4 text-white">
                        <h2 class="text-3xl font-bold">${data.name}</h2>
                        <p class="text-lg opacity-90">${data.subtitle}</p>
                    </div>
                </div>
                
                <!-- Price and Rating - Prominently Displayed -->
                <div class="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-6 border-2 border-blue-200">
                    <div class="flex items-center justify-between mb-4">
                        <div>
                            <span class="text-4xl font-bold text-blue-600">${data.price}</span>
                            <span class="text-gray-600 ml-2">per person</span>
                        </div>
                        <div class="text-right">
                            <div class="flex items-center text-yellow-400 mb-1">
                                ${'<i class="fas fa-star"></i>'.repeat(5)}
                            </div>
                            <span class="text-lg font-semibold text-gray-700">${data.rating}/5</span>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4 text-sm">
                        <div class="text-center">
                            <div class="font-semibold text-gray-700">Duration</div>
                            <div class="text-blue-600">${data.duration}</div>
                        </div>
                        <div class="text-center">
                            <div class="font-semibold text-gray-700">Best Time</div>
                            <div class="text-blue-600">${data.bestTime}</div>
                        </div>
                    </div>
                </div>
                
                <!-- Nearby Places with Rates -->
                <div class="bg-white rounded-2xl p-6 border border-gray-200">
                    <h3 class="text-xl font-bold mb-4 text-gray-800">Nearby Places & Rates</h3>
                    <div class="space-y-3">
                        ${data.nearbyPlaces.map(place => `
                            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div>
                                    <div class="font-semibold text-gray-800">${place.name}</div>
                                    <div class="text-sm text-gray-600">${place.distance} away</div>
                                </div>
                                <div class="text-right">
                                    <div class="font-bold text-green-600">${place.rate}</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            
            <!-- Right Column - Details -->
            <div>
                <div class="bg-white rounded-2xl p-6 border border-gray-200 mb-6">
                    <h3 class="text-xl font-bold mb-4 text-gray-800">Description</h3>
                    <p class="text-gray-700 leading-relaxed">${data.description}</p>
                </div>
                
                <div class="bg-white rounded-2xl p-6 border border-gray-200 mb-6">
                    <h3 class="text-xl font-bold mb-4 text-gray-800">Highlights</h3>
                    <div class="grid grid-cols-1 gap-2">
                        ${data.highlights.map(highlight => `
                            <div class="flex items-center">
                                <i class="fas fa-check-circle text-green-500 mr-3"></i>
                                <span class="text-gray-700">${highlight}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="bg-white rounded-2xl p-6 border border-gray-200">
                    <h3 class="text-xl font-bold mb-4 text-gray-800">What\'s Included</h3>
                    <div class="grid grid-cols-1 gap-2">
                        ${data.included.map(item => `
                            <div class="flex items-center">
                                <i class="fas fa-check text-blue-500 mr-3"></i>
                                <span class="text-gray-700">${item}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <!-- Call to Action -->
                <div class="mt-6">
                    <button onclick="generateTravelPlan('${data.name}', '', '', '2', 'moderate', ['culture', 'food'])" class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105">
                        <i class="fas fa-magic mr-2"></i>Generate Travel Plan
                    </button>
                </div>
            </div>
        </div>
    `;
    
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeDestinationModal() {
    const modal = document.getElementById('destinationModal');
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Demo video functionality
function playDemo() {
    const modal = document.getElementById('demoModal');
    const video = document.getElementById('demoVideo');
    modal.classList.remove('hidden');
    video.play();
}

function closeDemo() {
    const modal = document.getElementById('demoModal');
    const video = document.getElementById('demoVideo');
    modal.classList.add('hidden');
    video.pause();
    video.currentTime = 0;
}

// Close modals when clicking outside
document.addEventListener('click', (e) => {
    const demoModal = document.getElementById('demoModal');
    const destinationModal = document.getElementById('destinationModal');
    
    if (e.target === demoModal) {
        closeDemo();
    }
    
    if (e.target === destinationModal) {
        closeDestinationModal();
    }
}); 