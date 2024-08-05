import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Background = styled.div`
    width: 100%;
    max-width: 376px;
    height: 100vh;
    background-color: #ffffff;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: scroll;
`;

const HeaderTitle = styled.div`
    display: flex;
    align-items: center;
    font-size: 20px;
    font-weight: bold;
    color: #d94844;
    text-align: center;
`;

const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 376px;
    height: 60px;
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    background-color: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const BackIcon = styled.img`
    width: 24px;
    height: 24px;
    cursor: pointer;
    position: absolute;
    left: 20px;
`;

const TabContainer = styled.div`
    display: flex;
    width: 100%;
    max-width: 376px;
    justify-content: space-around;
    margin-top: 80px;
    border-bottom: 1px solid #e0e0e0;
`;

const TabButton = styled.button`
    background: none;
    border: none;
    font-size: 18px;
    font-weight: ${props => (props.active ? 'bold' : 'normal')};
    color: ${props => (props.active ? 'black' : '#888888')};
    padding: 10px;
    cursor: pointer;
    border-bottom: ${props => (props.active ? '2px solid black' : 'none')};

    &:focus {
        outline: none;
    }
`;

const Content = styled.div`
    width: 100%;
    max-width: 376px;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px; /* TabContainer와의 간격을 위해 추가 */
`;

const OrderList = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const OrderItem = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 10px;
    box-sizing: border-box;
    width: 100%;
    background-color: #ffffff;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const OrderDetails = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

const OrderInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

const OrderText = styled.div`
    font-size: 14px;
    margin-bottom: 5px;
    color:#555555;
`;

const OrderActions = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const ActionButton = styled.button`
    background-color: ${props => (props.approve ? '#4CAF50' : '#f44336')};
    color: white;
    border: none;
    border-radius: 8px;
    padding: 5px 10px;
    font-size: 14px;
    cursor: pointer;

    &:focus {
        outline: none;
    }
`;

const StatusText = styled.div`
    font-size: 14px;
    font-weight: bold;
    color: green;
    margin-bottom: 5px;
`;

const formatDate = (dateString) => {
    if (!dateString) return 'Invalid Date'; // 날짜가 없을 경우 대비

    const date = new Date(dateString);
    if (isNaN(date)) return 'Invalid Date'; // 날짜가 유효하지 않을 경우 대비

    return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
};

const SellingHistory = () => {
    const [activeTab, setActiveTab] = useState('pending');
    const [ordersPending, setOrdersPending] = useState([]);
    const [ordersCompleted, setOrdersCompleted] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const savedTab = localStorage.getItem('activeTab');
        if (savedTab) {
            setActiveTab(savedTab);
        }

        const fetchData = async () => {
            try {
                const response = await axios.get('http://13.125.100.193/store/1/purchase/list');
                const data = response.data;
                
                const pendingOrders = data.products.filter(product => product.buy_step === 'RES' || product.buy_step === 'PIC');
                const completedOrders = data.products.filter(product => product.buy_step === 'REJ' || product.buy_step === 'COM' || product.buy_step === 'AUT'||product.buy_step === 'CAN');
                
                setOrdersPending(pendingOrders.reverse());
                setOrdersCompleted(completedOrders.reverse());

                const now = new Date();
                for (const order of pendingOrders) {
                    if (order.reject_at && new Date(order.reject_at) < now) {
                        await handleActionClick(order.id, 'AUT');
                    }
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        localStorage.setItem('activeTab', tab);
    };

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleActionClick = async (orderId, action) => {
        try {
            const response = await axios.patch(`http://13.125.100.193/store/1/order/${orderId}/update-status`, {
                buy_step: action
            });
            if (response.status === 200) {
                const updatedOrder = response.data;
                updatedOrder.created_at = formatDate(updatedOrder.created_at);
                
                if (action === 'PIC') {
                    setOrdersPending(prevOrdersPending => prevOrdersPending.map(order =>
                        order.id === orderId ? { ...order, buy_step: 'PIC' } : order
                    ));
                } else if (action === 'COM' || action === 'REJ') {
                    setOrdersPending(prevOrdersPending => prevOrdersPending.filter(order => order.id !== orderId));
                    setOrdersCompleted(prevOrdersCompleted => [
                        ...prevOrdersCompleted,
                        {
                            ...updatedOrder,
                            created_at: formatDate(updatedOrder.created_at) // 날짜 포맷팅 후 추가
                        }
                    ]);
                }
                window.location.reload();
            }
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };
    return (
        <Background>
            <HeaderContainer>
                <BackIcon src="../assets/prev.svg" alt="Back" onClick={handleBackClick} />
                <HeaderTitle>판매 내역</HeaderTitle>
            </HeaderContainer>
            <TabContainer>
                <TabButton active={activeTab === 'pending'} onClick={() => handleTabClick('pending')}>
                    주문 처리중
                </TabButton>
                <TabButton active={activeTab === 'completed'} onClick={() => handleTabClick('completed')}>
                    주문 처리완료
                </TabButton>
            </TabContainer>
            <Content>
                <OrderList>
                    {activeTab === 'pending' && ordersPending.map((order, index) => (
                        <OrderItem key={index}>
                            <OrderDetails>
                                <OrderInfo>
                                    <OrderText>
                                        {order.buy_step === 'RES' && formatDate(order.created_at)}
                                        {order.buy_step === 'PIC' && formatDate(order.accept_at)}
                                    </OrderText>
                                    <OrderText>{order.order_number}</OrderText>
                                    <OrderText>{order.buyer_name}</OrderText>
                                </OrderInfo>
                                <div style={{ flexGrow: 1, marginLeft: '48px' }}>
                                    {order.buy_step === 'PIC' && <StatusText>픽업대기중</StatusText>}
                                    <OrderText>{order.sale_product_name} {order.amount}개</OrderText>
                                </div>
                                <OrderActions>
                                    {order.buy_step === 'PIC' ? (
                                        <ActionButton approve={true} onClick={() => handleActionClick(order.id, 'COM')}>픽업완료</ActionButton>
                                    ) : (
                                        <>
                                            <ActionButton approve={true} onClick={() => handleActionClick(order.id, 'PIC')}>수락하기</ActionButton>
                                            <ActionButton approve={false} onClick={() => handleActionClick(order.id, 'REJ')}>거절하기</ActionButton>
                                        </>
                                    )}
                                </OrderActions>
                            </OrderDetails>
                        </OrderItem>
                    ))}
                    {activeTab === 'completed' && ordersCompleted.map((order, index) => (
                        <OrderItem key={index}>
                            <OrderDetails>
                                <OrderInfo>
                                    <OrderText>{formatDate(order.created_at)}</OrderText>
                                    <OrderText>{order.order_number}</OrderText>
                                    <OrderText>{order.buyer_name}</OrderText>
                                </OrderInfo>
                                <OrderText>{order.sale_product_name} {order.amount}개</OrderText>
                                <OrderText>{order.buy_step === 'REJ' ? '주문거절' : order.buy_step === 'COM' ? '픽업완료' :order.buy_step === 'AUT' ? '30분 자동취소': '주문취소'}</OrderText>
                            </OrderDetails>
                        </OrderItem>
                    ))}
                </OrderList>
            </Content>
        </Background>
    );
};

export default SellingHistory;
