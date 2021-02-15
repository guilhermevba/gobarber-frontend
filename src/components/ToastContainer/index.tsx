import React from 'react';
import {
  FiAlertCircle,
  FiInfo,
  FiCheckCircle,
  FiXCircle,
} from 'react-icons/fi';
import { useTransition } from 'react-spring';
import { useToast } from '../../hooks/toast';
import { Container, Toast } from './styles';

interface ToastContainerProps {
  messages: Message[];
}

interface Message {
  id: string;
  type?: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}
const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const { removeToast } = useToast();
  const toastIcon = {
    success: <FiCheckCircle size={24} />,
    error: <FiAlertCircle size={24} />,
    info: <FiInfo size={24} />,
  };

  const messagesWithTransitions = useTransition(messages, ({ id }) => id, {
    from: { right: '-120%', opacity: 0 },
    enter: { right: '0', opacity: 1 },
    leave: { right: '-120px', opacity: 0 },
  });

  return (
    <Container>
      {messagesWithTransitions.map(({ item: message, key, props }) => (
        <Toast
          key={key}
          hasdescription={Number(!!message.description)}
          type={message.type || 'info'}
          style={props}
        >
          {toastIcon[message.type || 'info']}
          <div>
            <strong>{message.title}</strong>
            {message.description && <p>{message.description}</p>}
          </div>
          <button type="button" onClick={() => removeToast(message.id)}>
            <FiXCircle size={18} />
          </button>
        </Toast>
      ))}
    </Container>
  );
};

export default ToastContainer;
