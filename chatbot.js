// ============================================
// TECHATHON 2K26 - AI Chatbot
// ============================================

class TechathonChatbot {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.knowledgeBase = {
            greetings: ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening'],
            eventDate: ['when', 'date', 'day', 'time', 'schedule'],
            registration: ['register', 'registration', 'sign up', 'signup', 'join'],
            prizes: ['prize', 'prizes', 'reward', 'rewards', 'win', 'winning'],
            venue: ['where', 'location', 'venue', 'place', 'address'],
            team: ['team', 'members', 'group', 'size', 'participants'],
            problems: ['problem', 'statement', 'statements', 'topic', 'topics', 'theme'],
            contact: ['contact', 'email', 'phone', 'reach', 'help'],
            eligibility: ['eligible', 'eligibility', 'who can', 'participate', 'student'],
            cost: ['cost', 'fee', 'fees', 'price', 'free', 'paid'],
            certificate: ['certificate', 'certificates', 'certification'],
            food: ['food', 'meal', 'lunch', 'dinner', 'snacks', 'refreshments'],
            duration: ['long', 'duration', 'hours', 'days']
        };
        
        this.init();
    }

    init() {
        this.createChatbotUI();
        this.attachEventListeners();
        this.addMessage('bot', 'Hello! 👋 I\'m VIN, your TECHATHON 2K26 Virtual Assistant! I\'m here to help you with any questions about the event. Feel free to ask me anything!');
    }

    createChatbotUI() {
        const chatbotHTML = `
            <div id="chatbot-container" class="chatbot-container">
                <div class="chatbot-button" id="chatbot-button">
                    <i class="fas fa-comments"></i>
                    <span class="chatbot-badge">Ask me!</span>
                </div>
                
                <div class="chatbot-window" id="chatbot-window">
                    <div class="chatbot-header">
                        <div class="chatbot-header-content">
                            <i class="fas fa-robot"></i>
                            <div>
                                <h3>VIN</h3>
                                <p class="chatbot-status">Online</p>
                            </div>
                        </div>
                        <button class="chatbot-close" id="chatbot-close">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    
                    <div class="chatbot-messages" id="chatbot-messages">
                        <!-- Messages will be added here -->
                    </div>
                    
                    <div class="chatbot-quick-replies" id="quick-replies">
                        <button class="quick-reply" data-message="When is TECHATHON 2K26?">📅 Event Date</button>
                        <button class="quick-reply" data-message="How to register?">📝 Registration</button>
                        <button class="quick-reply" data-message="What are the prizes?">🏆 Prizes</button>
                        <button class="quick-reply" data-message="Where is the venue?">📍 Venue</button>
                    </div>
                    
                    <div class="chatbot-input-area">
                        <input 
                            type="text" 
                            id="chatbot-input" 
                            placeholder="Type your question..."
                            autocomplete="off"
                        />
                        <button id="chatbot-send">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    }

    attachEventListeners() {
        const button = document.getElementById('chatbot-button');
        const closeBtn = document.getElementById('chatbot-close');
        const sendBtn = document.getElementById('chatbot-send');
        const input = document.getElementById('chatbot-input');
        
        button.addEventListener('click', () => this.toggleChat());
        closeBtn.addEventListener('click', () => this.toggleChat());
        sendBtn.addEventListener('click', () => this.sendMessage());
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        // Quick replies
        document.querySelectorAll('.quick-reply').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const message = e.target.dataset.message;
                this.addMessage('user', message);
                this.processMessage(message);
            });
        });
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        const window = document.getElementById('chatbot-window');
        const button = document.getElementById('chatbot-button');
        
        if (this.isOpen) {
            window.classList.add('active');
            button.classList.add('hidden');
        } else {
            window.classList.remove('active');
            button.classList.remove('hidden');
        }
    }

    sendMessage() {
        const input = document.getElementById('chatbot-input');
        const message = input.value.trim();
        
        if (message) {
            this.addMessage('user', message);
            input.value = '';
            
            setTimeout(() => {
                this.processMessage(message);
            }, 500);
        }
    }

    addMessage(sender, text) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `chatbot-message ${sender}-message`;
        
        const avatar = sender === 'bot' 
            ? '<i class="fas fa-robot"></i>' 
            : '<i class="fas fa-user"></i>';
        
        messageDiv.innerHTML = `
            <div class="message-avatar">${avatar}</div>
            <div class="message-content">${text}</div>
        `;
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    processMessage(message) {
        const lowerMessage = message.toLowerCase();
        let response = this.getResponse(lowerMessage);
        
        this.addMessage('bot', response);
    }

    getResponse(message) {
        // Greetings
        if (this.containsKeywords(message, this.knowledgeBase.greetings)) {
            return 'Hello! 😊 I\'m VIN, your virtual assistant. How can I help you with TECHATHON 2K26 today?';
        }

        // Event Date & Duration
        if (this.containsKeywords(message, this.knowledgeBase.eventDate) || 
            this.containsKeywords(message, this.knowledgeBase.duration)) {
            return '📅 TECHATHON 2K26 will be held on <strong>January 23, 2026</strong> from <strong>9:00 AM to 3:30 PM</strong> at Kings Engineering College, Sriperumbudur. It\'s a 6.5-hour intensive hackathon!';
        }

        // Registration
        if (this.containsKeywords(message, this.knowledgeBase.registration)) {
            return '📝 Registration is open from <strong>January 8-22, 2026</strong>!<br><br>To register:<br>1. Click the "Register" button on our website<br>2. Form teams of 1-5 members<br>3. Choose your problem statement<br>4. Submit your details<br><br>You\'ll receive a confirmation email immediately! 🎉';
        }

        // Prizes
        if (this.containsKeywords(message, this.knowledgeBase.prizes)) {
            return '🏆 <strong>Exciting Prizes Await!</strong><br><br>🥇 1st Place: Exciting Gifts + Certificates<br>🥈 2nd Place: Exciting Gifts + Certificates<br>🥉 3rd Place: Exciting Gifts + Certificates<br><br>Plus, ALL participants receive certificates of participation! 📜';
        }

        // Venue
        if (this.containsKeywords(message, this.knowledgeBase.venue)) {
            return '📍 <strong>Venue:</strong> Kalvithanthai Auditorium<br>Kings Engineering College<br>Chennai-Bangalore Highway<br>Irungattukottai, Sriperumbudur 602117';
        }

        // Team & Size
        if (this.containsKeywords(message, this.knowledgeBase.team)) {
            return '👥 Teams can have <strong>1-5 members</strong>. You can participate individually or form a group!<br><br>Team Requirements:<br>• 1-5 participants per team<br>• All levels welcome<br>• Students from any department can join';
        }

        // Problem Statements
        if (this.containsKeywords(message, this.knowledgeBase.problems)) {
            return '💡 We have <strong>42 problem statements</strong> across various categories:<br><br>• Healthcare & Medical Tech<br>• Smart Cities & IoT<br>• AI & Machine Learning<br>• Sustainability & Environment<br>• Education Technology<br>• And many more!<br><br>Check the "Problem Statements" page for the complete list!';
        }

        // Eligibility
        if (this.containsKeywords(message, this.knowledgeBase.eligibility)) {
            return '✅ <strong>Open to ALL students!</strong><br><br>• Any year (1st-4th year)<br>• Any department<br>• Any college<br>• Beginners and experts welcome<br><br>Just bring your enthusiasm and creativity! 🚀';
        }

        // Cost
        if (this.containsKeywords(message, this.knowledgeBase.cost)) {
            return '💰 TECHATHON 2K26 is <strong>COMPLETELY FREE!</strong><br><br>No registration fees, no hidden costs. Just register and participate! 🎉';
        }

        // Certificates
        if (this.containsKeywords(message, this.knowledgeBase.certificate)) {
            return '📜 <strong>Certificates for Everyone!</strong><br><br>• ALL participants receive certificates of participation<br>• Winners get special achievement certificates<br>• Certificates will be provided on the event day or via email';
        }

        // Food/Meals
        if (this.containsKeywords(message, this.knowledgeBase.food)) {
            return '🍽️ Please note that <strong>meals and refreshments are NOT provided</strong> during the event. We recommend bringing your own snacks and water!';
        }

        // Contact
        if (this.containsKeywords(message, this.knowledgeBase.contact)) {
            return '📧 <strong>Contact Us:</strong><br><br>📍 Visit: Kalvithanthai Auditorium (Event Venue)<br>📧 Email: techathon2k26@gmail.com<br>📱 Instagram: @novanexus_ece<br><br>Or use the Contact form on our website!';
        }

        // Default response
        return 'I\'m not sure about that specific question. Here are some things I can help with:<br><br>• Event date and schedule<br>• Registration process<br>• Prizes and rewards<br>• Venue information<br>• Team requirements<br>• Problem statements<br><br>You can also visit our <strong>Contact</strong> page or ask me something else! 😊';
    }

    containsKeywords(message, keywords) {
        return keywords.some(keyword => message.includes(keyword));
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TechathonChatbot();
});
