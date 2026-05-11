import { QRCodeSVG } from 'qrcode.react';
import { FiX, FiCopy, FiCheckCircle, FiShield, FiSmartphone, FiGrid, FiClock, FiAlertCircle } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import './UPIModal.css';

const UPIModal = ({ amount, isOpen, onClose, onPaymentSuccess }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('qr');
  const [paymentStatus, setPaymentStatus] = useState('idle'); // 'idle', 'verifying', 'success'
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const upiId = "7285870201@fam";
  
  const upiLink = `upi://pay?pa=${upiId}&pn=LuxeLane&am=${amount}&cu=INR&tn=Order%20Payment`;

  // Countdown Timer
  useEffect(() => {
    if (!isOpen || paymentStatus !== 'idle') return;
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, timeLeft, paymentStatus]);

  // Handle Success Redirection
  useEffect(() => {
    if (paymentStatus === 'success') {
      const timer = setTimeout(() => {
        onPaymentSuccess();
        onClose();
        setPaymentStatus('idle');
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [paymentStatus, onPaymentSuccess, onClose]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    toast.success('UPI ID Copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const startVerification = () => {
    setPaymentStatus('verifying');
    // Real verification simulation like Flipkart
    setTimeout(() => {
      setPaymentStatus('success');
    }, 5000);
  };

  const handleAppClick = (appName) => {
    toast.loading(`Opening ${appName}...`, { id: 'upi-load' });
    setTimeout(() => {
      toast.dismiss('upi-load');
      toast('Complete payment in app. Verification started...', { icon: '📱' });
      startVerification();
    }, 2000);
  };


  if (!isOpen) return null;

  // Processing View
  if (paymentStatus === 'verifying') {
    return (
      <div className="upi-modal-overlay">
        <div className="upi-modal-v3 glass-card flex-center flex-col animate-scale-in">
          <div className="v3-loader">
            <div className="v3-loader__spinner" />
            <FiShield className="v3-loader__shield" />
          </div>
          <h2 className="v3-status-text">Verifying with Bank</h2>
          <p className="v3-subtext">Waiting for payment confirmation for ₹{amount}...</p>
          <div className="v3-progress-bar"><div className="v3-progress-fill" /></div>
        </div>
      </div>
    );
  }

  // Success View
  if (paymentStatus === 'success') {
    return (
      <div className="upi-modal-overlay">
        <div className="upi-modal-v3 glass-card flex-center flex-col animate-scale-in success-bg">
          <div className="v3-success-circle">
            <FiCheckCircle />
          </div>
          <h2 className="v3-success-title">Order Confirmed!</h2>
          <p className="v3-subtext">Payment of ₹{amount} received successfully.</p>
          <div className="v3-success-details">
            <span>Ref ID: SV{Math.floor(Math.random()*1000000)}</span>
          </div>
          <div className="v3-auto-redirect">Redirecting in 3 seconds...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="upi-modal-overlay">
      <div className="upi-modal-v3 glass-card animate-scale-in">
        <button className="upi-v3__close" onClick={onClose}><FiX /></button>
        
        {/* Header with Timer */}
        <div className="upi-v3__header">
          <div className="upi-v3__brand">
            <div className="v3-icon-badge">🛍️</div>
            <div>
              <h3>LuxeLane Pay</h3>
              <p className="v3-secure-tag"><FiShield /> Secure Checkout</p>
            </div>
          </div>
          <div className={`upi-v3__timer ${timeLeft < 60 ? 'v3-timer-urgent' : ''}`}>
            <FiClock /> {formatTime(timeLeft)}
          </div>
        </div>

        {/* Amount Banner */}
        <div className="upi-v3__amount-banner">
          <label>TOTAL PAYABLE</label>
          <div className="v3-price">₹{amount}</div>
        </div>

        {/* Tabs */}
        <div className="upi-v3__tabs">
          <button className={`v3-tab ${activeTab === 'qr' ? 'active' : ''}`} onClick={() => setActiveTab('qr')}>
            <FiGrid /> QR Code
          </button>
          <button className={`v3-tab ${activeTab === 'apps' ? 'active' : ''}`} onClick={() => setActiveTab('apps')}>
            <FiSmartphone /> UPI Apps
          </button>
        </div>

        {/* Content */}
        <div className="upi-v3__body">
          {activeTab === 'qr' ? (
            <div className="v3-qr-section animate-fade-in">
              <div className="v3-qr-frame">
                <QRCodeSVG value={upiLink} size={160} bgColor={"#ffffff"} fgColor={"#0a0e1a"} level={"H"} includeMargin={true} />
                <div className="v3-qr-pulse" />
              </div>
              <p className="v3-instruction">Scan this QR using any UPI app on your phone</p>
            </div>
          ) : (
            <div className="v3-apps-section animate-fade-in">
              <div className="v3-apps-grid">
                {[
                  { name: 'GPay', icon: 'https://www.vectorlogo.zone/logos/google_pay/google_pay-icon.svg' },
                  { name: 'PhonePe', icon: 'https://www.vectorlogo.zone/logos/phonepe/phonepe-icon.svg' },
                  { name: 'Paytm', icon: 'https://www.vectorlogo.zone/logos/paytm/paytm-icon.svg' },
                  { name: 'Bhim', icon: 'https://www.vectorlogo.zone/logos/npci_bhim/npci_bhim-icon.svg' }
                ].map(app => (
                  <div key={app.name} className="v3-app-item" onClick={() => handleAppClick(app.name)}>
                    <div className="v3-app-icon-container"><img src={app.icon} alt={app.name} /></div>
                    <span>{app.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="v3-id-copy" onClick={handleCopy}>
            <span>UPI ID: {upiId}</span>
            {copied ? <FiCheckCircle className="v3-copied" /> : <FiCopy />}
          </div>
        </div>

        {/* Footer */}
        <div className="upi-v3__footer">
          <div className="v3-warning">
            <FiAlertCircle /> <span>Verification starts automatically after payment</span>
          </div>
          <div className="v3-logos">
             <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" alt="UPI" />
          </div>
        </div>
      </div>
    </div>
  );
};


export default UPIModal;
