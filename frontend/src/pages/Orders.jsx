import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPackage, FiTruck, FiCheckCircle, FiClock, FiChevronDown, FiChevronUp, FiShoppingBag, FiEye } from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../data/products';
import Button from '../components/common/Button';
import './Orders.css';

const demoOrders = [
  {
    id: 'SV-2026-001',
    date: '2026-05-10',
    status: 'delivered',
    total: 349.98,
    items: [
      { id: 1, name: 'Premium Wireless Headphones', price: 299.99, quantity: 1, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop' },
      { id: 7, name: 'Wireless Charging Pad', price: 49.99, quantity: 1, image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=100&h=100&fit=crop' },
    ],
  },
  {
    id: 'SV-2026-002',
    date: '2026-05-08',
    status: 'shipped',
    total: 449.99,
    items: [
      { id: 2, name: 'Smart Watch Ultra', price: 449.99, quantity: 1, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop' },
    ],
  },
  {
    id: 'SV-2026-003',
    date: '2026-05-05',
    status: 'processing',
    total: 189.99,
    items: [
      { id: 3, name: 'Designer Leather Backpack', price: 189.99, quantity: 1, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&h=100&fit=crop' },
    ],
  },
  {
    id: 'SV-2026-004',
    date: '2026-04-28',
    status: 'delivered',
    total: 249.98,
    items: [
      { id: 4, name: 'Minimal Running Shoes', price: 159.99, quantity: 1, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop' },
      { id: 9, name: 'Yoga Mat Premium', price: 89.99, quantity: 1, image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=100&h=100&fit=crop' },
    ],
  },
  {
    id: 'SV-2026-005',
    date: '2026-04-20',
    status: 'delivered',
    total: 169.99,
    items: [
      { id: 10, name: 'Mechanical Keyboard RGB', price: 169.99, quantity: 1, image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=100&h=100&fit=crop' },
    ],
  },
];

const statusConfig = {
  processing: { label: 'Processing', icon: <FiClock />, color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.12)' },
  shipped: { label: 'Shipped', icon: <FiTruck />, color: '#06b6d4', bg: 'rgba(6, 182, 212, 0.12)' },
  delivered: { label: 'Delivered', icon: <FiCheckCircle />, color: '#10b981', bg: 'rgba(16, 185, 129, 0.12)' },
};

const Orders = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [expandedOrder, setExpandedOrder] = useState(null);

  if (!user) {
    return (
      <main className="orders-page page-active" id="orders-page">
        <div className="container">
          <div className="orders__empty">
            <span className="orders__empty-icon">📦</span>
            <h2>Please Login First</h2>
            <p>You need to be logged in to view your orders</p>
            <Button variant="primary" size="lg" onClick={() => navigate('/login')}>Login Now</Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="orders-page page-active" id="orders-page">
      <div className="container">
        <div className="orders__header animate-fade-in-up">
          <h1>My <span className="gradient-text">Orders</span></h1>
          <p className="orders__subtitle">{demoOrders.length} orders placed</p>
        </div>

        <div className="orders__list stagger-children">
          {demoOrders.map((order) => {
            const status = statusConfig[order.status];
            const isExpanded = expandedOrder === order.id;

            return (
              <div key={order.id} className="orders__card glass-card" id={`order-${order.id}`}>
                <div className="orders__card-header" onClick={() => setExpandedOrder(isExpanded ? null : order.id)}>
                  <div className="orders__card-left">
                    <div className="orders__order-id">
                      <FiPackage />
                      <span>{order.id}</span>
                    </div>
                    <span className="orders__date">{new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </div>

                  <div className="orders__card-right">
                    <span className="orders__status" style={{ color: status.color, background: status.bg }}>
                      {status.icon} {status.label}
                    </span>
                    <span className="orders__total">{formatPrice(order.total)}</span>
                    {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
                  </div>
                </div>

                {isExpanded && (
                  <div className="orders__details animate-fade-in-down">
                    <div className="orders__items">
                      {order.items.map((item) => (
                        <div key={item.id} className="orders__item">
                          <img src={item.image} alt={item.name} className="orders__item-image" />
                          <div className="orders__item-info">
                            <Link to={`/product/${item.id}`} className="orders__item-name">{item.name}</Link>
                            <span className="orders__item-qty">Qty: {item.quantity}</span>
                          </div>
                          <span className="orders__item-price">{formatPrice(item.price)}</span>
                        </div>
                      ))}
                    </div>

                    {/* Progress Tracker */}
                    <div className="orders__tracker">
                      <div className={`orders__track-step ${['processing', 'shipped', 'delivered'].includes(order.status) ? 'active' : ''}`}>
                        <div className="orders__track-dot" />
                        <span>Ordered</span>
                      </div>
                      <div className={`orders__track-line ${['shipped', 'delivered'].includes(order.status) ? 'active' : ''}`} />
                      <div className={`orders__track-step ${['shipped', 'delivered'].includes(order.status) ? 'active' : ''}`}>
                        <div className="orders__track-dot" />
                        <span>Shipped</span>
                      </div>
                      <div className={`orders__track-line ${order.status === 'delivered' ? 'active' : ''}`} />
                      <div className={`orders__track-step ${order.status === 'delivered' ? 'active' : ''}`}>
                        <div className="orders__track-dot" />
                        <span>Delivered</span>
                      </div>
                    </div>

                    <div className="orders__actions">
                      <Link to={`/product/${order.items[0].id}`}>
                        <Button variant="outline" size="sm" icon={<FiEye />}>View Product</Button>
                      </Link>
                      {order.status === 'delivered' && (
                        <Button variant="primary" size="sm" icon={<FiShoppingBag />} onClick={() => {
                          order.items.forEach(item => navigate(`/product/${item.id}`));
                        }}>Buy Again</Button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default Orders;
