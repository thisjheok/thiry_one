import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as BarTooltip, Legend as BarLegend } from 'recharts';
import axios from 'axios';

const COLORS = ['#fdb5b5', '#ffd787', '#9ac7fe', '#c79afe','#9dda77'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {(percent * 100).toFixed(0)}%
    </text>
  );
};

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
  padding-bottom: 150px; /* Make space for the Navbar */
  padding-top: 90px;
`;

const BackIcon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
  position: absolute;
  left: 20px;
`;

const PieBox = styled.div`
  width: 100%;
  height: 300px;
  margin-top: 20px;
`;

const BarBox = styled.div`
  width: 100%;
  height: 400px;
  margin-top: 20px;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  width: 90%;
  height: 200px;
`;

const Card = styled.div`
  height: 80px;
  background-color: ${(props) => props.bgColor};
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-size: 16px;
  padding: 5px;
`;

const ChartTitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
  margin-top: 30px;
  margin-bottom: 10px; /* Add more space below the title */
`;

const ChartTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-right: 10px;
  margin-left: 20px;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 376px;
  height: 60px;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  color: #d94844;
  text-align: center;
`;

const ComboBox = styled.select`
  font-size: 16px;
  padding: 3px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const CommentBox = styled.div`
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-top: 50px;
  width: 80%;
  padding: 20px;
  background-color: #fcfcfc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CommentText = styled.p`
  font-size: 16px;
  color: #333;
  margin: 10px 0;
  line-height: 1.4;
`;

const CommentText_1 = styled.p`
  font-size: 15px;
  color: #333;
  margin: 10px 0;
  line-height: 1.4;
`;

const Highlight = styled.span`
  font-weight: bold;
  color: #d94844;
`;

const CommentTitle = styled.h3`
  font-size: 22px;
  font-weight: bold;
  color: #d94844;
  margin-bottom: 20px;
`;

const DashBoard = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('');
  const [summaryData, setSummaryData] = useState({});
  const [rank, setRank] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(0);
  const [trendData, setTrendData] = useState([]);
  const [comment, setComment] = useState({});
  const handleBackClick = () => {
    navigate(-1);
  };

  // 콤보박스 선택 변경 처리 함수
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setSelectedProduct(event.target.value);
  };

  useEffect(() => {
    const fetchSumData = async () => {
        try {
            const response = await axios.get('http://13.125.100.193/dashboard/summary/1');
            const data = response.data;
            setSummaryData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchRankData = async () => {
      try {
          const response = await axios.get('http://13.125.100.193/dashboard/rank/1');
          const data = response.data;
          const transformedData = data.map(item => ({
            name: item.name,
            value: item.total_selled
          }));
          setRank(transformedData);
      } catch (error) {
          console.error('Error fetching data:', error);
      }
    };

    const fetchComment = async () => {
      try {
        const response = await axios.get('http://13.125.100.193/dashboard/advice/1');
        const data = response.data;
        setComment(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://13.125.100.193/buyer/store/1/list');
        const data = response.data;
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchSumData();
    fetchRankData();
    fetchProducts();
    fetchComment();
  }, []);

  // selectedProduct 값이 변경될 때 데이터를 가져오는 useEffect
  useEffect(() => {
    const fetchTrendData = async () => {
      if (selectedProduct) {
        try {
          const response = await axios.get(`http://13.125.100.193/dashboard/trend/1/${selectedProduct}`);
          const data = response.data;
          const transformedData = data.map(item => ({
            name: item.date,
            판매된떨이: item.selled_amount,
            등록된떨이: item.remove_total,
            amt: item.amount
          }));
          setTrendData(transformedData);
        } catch (error) {
          console.error('Error fetching trend data:', error);
        }
      }
    };
    fetchTrendData();
  }, [selectedProduct]);
  
  return (
    <>
      <Background>
        <HeaderContainer>
          <BackIcon src="../assets/prev.svg" alt="Back" onClick={handleBackClick} />
          <HeaderTitle>판매 리포트</HeaderTitle>
        </HeaderContainer>
        <CardContainer>
          <Card bgColor="#e57373">
            오늘 판매한 떨이
            <div style={{marginTop:"10px"}}>{summaryData.today_sales_count}개</div>
          </Card>
          <Card bgColor="#424242">
            오늘 떨이 판매 수입
            <div style={{marginTop:"10px"}}>{summaryData.today_sales_income} 원</div>
          </Card>
          <Card bgColor="#e57373">
            한달 간 판매한 떨이
            <div style={{marginTop:"10px"}}>{summaryData.month_sales_count}개</div>
          </Card>
          <Card bgColor="#424242">
            한달 간 떨이 판매 수익
            <div style={{marginTop:"10px"}}>{summaryData.month_sales_income} 원</div>
          </Card>
        </CardContainer>
        <PieBox>
          <ChartTitle>상품별 판매 순위</ChartTitle>
          <div style={{marginBottom:"10px"}}></div>
          <ResponsiveContainer width="90%" height="90%">
            <PieChart width={400} height={400}>
              <Pie
                data={rank}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {rank.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="top" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </PieBox>
        <BarBox>
          <ChartTitleContainer>
            <ChartTitle>주간 품목별 떨이 판매 추이</ChartTitle>
            <ComboBox value={selectedOption} onChange={handleOptionChange}>
              <option value="">상품 선택</option>
              {products.map(product => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </ComboBox>
          </ChartTitleContainer>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={trendData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <BarTooltip />
              <BarLegend verticalAlign="top" height={36} />
              <Bar dataKey="판매된떨이" stackId="a" fill="#d74545" />
              <Bar dataKey="등록된떨이" stackId="a" fill="#939090" />
            </BarChart>
          </ResponsiveContainer>
        </BarBox>
        {comment.most_selled && comment.least_selled && comment.most_based_post && comment.least_based_post && (
          <CommentBox>
            <CommentTitle>판매 분석</CommentTitle>
            <CommentText>가장 많이 팔린 상품은 <Highlight>{comment.most_selled.name}</Highlight></CommentText>
            <CommentText>가장 적게 팔린 상품은 <Highlight>{comment.least_selled.name}</Highlight></CommentText>
            <CommentText>등록 대비 가장 많이 팔린 상품은 <Highlight>{comment.most_based_post.name}</Highlight></CommentText>
            <CommentText>등록 대비 가장 적게 팔린 상품은 <Highlight>{comment.least_based_post.name}</Highlight></CommentText>
            <div style={{marginTop:"20px"}}></div>
            <CommentText_1><Highlight>{comment.least_based_post.name}</Highlight> 상품의 주문량을 줄일 필요가 있어요!</CommentText_1>
          </CommentBox>
        )}
      </Background>
    </>
  );
};

export default DashBoard;
