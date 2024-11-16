# Cryptocurrency Dashboard

A responsive and feature-rich cryptocurrency dashboard built with **React.js**. This application integrates with external APIs to display cryptocurrency data, provides customizable price history views, and ensures an engaging user interface for both desktop and mobile users.

---

## **Features**

### **1. User Interface**

- **Responsive Design**: Adapts seamlessly across devices.
- **Sidebar Navigation**:
  - Full-sized sidebar for desktop.
  - Minimizable sidebar showing only icons.
- **Mobile Header**:
  - Visible only on smaller screens (≤620px).
  - Includes a toggleable menu for easy navigation.

### **2. Dashboard View**

- Displays a list of cryptocurrencies with:
  - Name, Symbol, Current Price
  - 24h Price Change %
  - Market Cap
- **Search Bar**: Filter cryptocurrencies by name or symbol.
- **Infinite Scroll**: Efficiently handles large datasets.

### **3. Coin Detail View**

- Displays detailed information about a selected cryptocurrency.
- **Price History Chart**:
  - Customizable timeframes: 1 day, 7 days, 1 month, etc.
- Dynamic updates on timeframe selection.

### **4. Settings and Analytics**

- Settings and analytics pages with a "Work in Progress" status.

### **5. API Integration**

- **Data Source**: [CoinGecko API](https://www.coingecko.com/en/api).
- Endpoints used:
  - `/` - Fetch dashboard data.
  - `/coins/{id}` - Fetch detailed coin data.

### **6. Performance Optimizations**

- **Lazy Loading**: For efficient rendering of the dashboard list.
- **Client-Side Caching**: Prevents redundant API calls using React Query.
- **Dynamic Rendering**: Prevents page reloads on user actions.

---

## **Installation**

### **1. Prerequisites**

- Node.js (>= 14.x)
- npm or yarn package manager

### **2. Clone the Repository**

```bash
git clone https://github.com/your-username/crypto-dashboard.git
cd crypto-dashboard
```
