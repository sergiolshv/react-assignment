import React from 'react';
import Styles from "../index.css"
import {
    ResponsiveContainer,
    AreaChart,
    XAxis,
    YAxis,
    Area,
    Tooltip,
    CartesianGrid,
  } from "recharts";
  import { format, parseISO, subDays } from "date-fns";
  import useFetch from '../hooks/useFetch'

  export default function Home() {
    const { loading, error, data } = useFetch('http://45.63.105.164:1337/requests')
    
    if (loading) return <p>Loading...</p>
    if (error) return <p>An error has ocurred</p>

      return (
          <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
              <h1>Number of requests: {data.length} </h1>
          <ResponsiveContainer width="75%" height={600}>
              <AreaChart data={data}>
                  <Area dataKey="id"/>
                  <XAxis dataKey="created_at"/>
                  <YAxis dataKey="id"/>
                  <Tooltip content={<CustomTooltip />} />
                  <CartesianGrid />
              </AreaChart>
          </ResponsiveContainer>
          </div>
      );
  }

  function CustomTooltip({ active, payload, label }) {
    if (active) {
      return (
        <div className="tooltip">
          <h4>{format(parseISO(label), "eeee, d MMM, yyyy HH:mm:ss z")}</h4>
          <p> Route used: {JSON.stringify(payload[0].payload.route, null, 2)}</p>
        </div>
      );
    }
    return null;
  }