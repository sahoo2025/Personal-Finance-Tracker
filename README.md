# Personal Finance Tracker

A modern, fully responsive web application for tracking expenses and managing budgets. Built with pure HTML, CSS, and JavaScript (ES6+), this application provides a professional dashboard interface with real-time analytics and data visualization.

## 🌟 Features

### Core Features
- **Dashboard Layout**: Professional and modern UI with summary cards, forms, and charts
- **Expense Management**: Add, edit, and delete expenses with ease
- **Budget Management**: Set monthly budgets and track spending
- **Real-time Analytics**: Dynamic charts showing expense distribution and trends
- **Data Persistence**: All data saved to browser LocalStorage
- **Search & Filter**: Quickly find expenses by title or category

### Advanced Features
- **Dark/Light Mode**: Toggle between themes for comfortable viewing
- **CSV Export**: Export expense data to CSV for external analysis
- **Toast Notifications**: Visual feedback for all user actions
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Interactive Charts**: Beautiful data visualization using Chart.js
- **Budget Warnings**: Alerts when expenses exceed budget limits

## 🚀 Tech Stack

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS variables, Flexbox, and Grid
- **JavaScript (ES6+)**: Modular and optimized code
- **Chart.js**: Data visualization library
- **Font Awesome**: Icon library
- **LocalStorage**: Client-side data persistence

## 📁 Project Structure

```
finance-tracker/
│
├── index.html              # Main HTML file
├── css/
│   └── style.css          # All styling with responsive design
├── js/
│   └── script.js          # Application logic and functionality
├── assets/
│   └── images/            # Image assets (if needed)
└── README.md              # Project documentation

## 📖 Usage Guide

### Setting Up Your Budget
1. Enter your monthly budget amount in the "Set Budget" section
2. Click "Set Budget" to save
3. Your budget will be displayed in the summary cards

### Adding Expenses
1. Fill in the expense form:
   - **Title**: Description of the expense (e.g., "Grocery Shopping")
   - **Amount**: Cost in dollars
   - **Category**: Select from predefined categories
   - **Date**: Date of the expense
2. Click "Add Expense"
3. The expense will appear in the list and update all statistics

### Managing Expenses
- **Edit**: Click the "Edit" button to modify an expense
- **Delete**: Click the "Delete" button to remove an expense
- **Search**: Use the search bar to find expenses by title
- **Filter**: Use the dropdown to filter by category

### Viewing Analytics
- **Pie Chart**: Shows expense distribution by category
- **Bar Chart**: Displays monthly spending trends
- Charts update automatically when expenses are added/modified

### Exporting Data
1. Click the "Export CSV" button in the header
2. The file will download automatically
3. Open the CSV in Excel, Google Sheets, or any spreadsheet application

### Dark Mode
- Click the moon/sun icon in the header to toggle between light and dark themes
- Your preference is saved and persists across sessions

## 🎨 Categories

The application includes the following expense categories:
- **Food**: Groceries, dining out, snacks
- **Travel**: Transportation, flights, hotels
- **Shopping**: Clothing, electronics, household items
- **Bills**: Utilities, rent, subscriptions
- **Entertainment**: Movies, games, events
- **Others**: Miscellaneous expenses

## 💾 Data Storage

All data is stored in the browser's LocalStorage:
- **Expenses**: Complete expense history
- **Budget**: Monthly budget setting
- **Theme Preference**: Dark/light mode selection

**Note**: Data is stored locally on your browser. Clearing browser data will remove all stored information.

## 🎯 Key Features Explained

### Summary Cards
- **Total Budget**: Your set monthly budget
- **Total Expenses**: Sum of all expenses
- **Remaining Balance**: Budget minus expenses (turns red if negative)

### Budget Warning
A warning banner appears when expenses exceed the budget, helping you stay on track.

### Responsive Design
The application adapts to different screen sizes:
- **Desktop**: Full dashboard with side-by-side layouts
- **Tablet**: Optimized grid layouts
- **Mobile**: Stacked layouts with touch-friendly controls

### Smooth Animations
- Hover effects on cards and buttons
- Slide-in animations for new expenses
- Smooth transitions for theme changes
- Modal animations for edit forms

## 🔧 Customization

### Adding New Categories
Edit the `index.html` file and add options to the category select dropdowns:
```html
<option value="NewCategory">New Category</option>
```

Then update the CSS in `style.css` to add color styling:
```css
.category-NewCategory {
    background: rgba(color, 0.1);
    color: #color;
}
```

### Modifying Colors
Edit the CSS variables in `style.css`:
```css
:root {
    --primary-color: #your-color;
    --secondary-color: #your-color;
    /* ... more variables */
}
```

## 🐛 Troubleshooting

### Charts Not Displaying
- Ensure you have an internet connection (Chart.js loads from CDN)
- Check browser console for errors
- Try clearing browser cache

### Data Not Persisting
- Check if LocalStorage is enabled in your browser
- Some browsers block LocalStorage in private/incognito mode
- Try using normal browsing mode

### Responsive Issues
- Ensure viewport meta tag is present in HTML
- Check browser compatibility (modern browsers recommended)
- Clear browser cache

## 📱 Browser Compatibility

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Opera

**Minimum Version**: Browsers released after 2018

## 🚀 Future Enhancements

Potential features for future versions:
- User authentication and cloud sync
- Multiple budget categories
- Expense recurrence (daily, weekly, monthly)
- Income tracking
- Currency conversion
- Advanced reporting and PDF export
- Mobile app version

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Development

### Code Quality
- Clean, well-commented code
- Modular JavaScript functions
- CSS variables for easy theming
- Semantic HTML structure
- No external framework dependencies

### Performance
- Optimized DOM manipulation
- Efficient event delegation
- Minimal external dependencies
- Fast load times

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check existing documentation
- Review the code comments

## 🎓 Learning Resources

This project demonstrates:
- Modern CSS techniques (Grid, Flexbox, Variables)
- JavaScript ES6+ features (arrow functions, template literals, destructuring)
- LocalStorage API usage
- Chart.js integration
- Responsive web design principles
- Event handling and DOM manipulation
- Form validation and user feedback

## 📊 Project Statistics

- **Lines of Code**: ~1500+
- **Files**: 4 main files
- **Dependencies**: 2 CDN links (Chart.js, Font Awesome)
- **Development Time**: Professional internship-level project

## ✨ Acknowledgments

- Chart.js for the excellent charting library
- Font Awesome for beautiful icons
- Modern CSS techniques and best practices

---

**Built By Suchitra Kumar Sahoo**

