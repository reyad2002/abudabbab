import { TbCalendarCancel } from "react-icons/tb";
import { BsCalendar2MinusFill } from "react-icons/bs";
import { FaWheelchair } from "react-icons/fa";
import { BsPersonRaisedHand } from "react-icons/bs";

import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    trips: [
        {
      id: "1",
      title: "Adventure Day",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      img: "/img/p4.jpg",
      img2: "/img/p4.jpg",
      img3: "/img/p4.jpg",
      img4: "/img/p4.jpg",
      img5: "/img/p4.jpg",
      price: [
        { type: "Adult", amount_egy: 20 * 50, amount_euro: 20 },
        { type: "Child", amount_egy: 10 * 50, amount_euro: 10 },
      ],
      from: "8",
      to: "4",
      rating: 4.8,
      features: [
        {
          // icon: <TbCalendarCancel className="text-[25px]" />,
          title: "Free cancellation",
          subtitle: "Cancel up to 24 hours in advance for a full refund.",
        },
        {
          // icon: <BsCalendar2MinusFill className="text-[25px]" />,
          title: "Reserve now & pay later",
          subtitle:
            "Keep your travel plans flexible — book your spot and pay nothing today.",
        },
        {
          // icon: <BsPersonRaisedHand className="text-[25px]" />,
          title: "Live tour guide",
          subtitle: "English",
        },
        {
          // icon: <FaWheelchair className="text-[25px]" />,
          title: "Wheelchair accessible",
        },
      ],
    },
    {
      id: "2",
      title: "Escape Day",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",

      img: "/img/p5.jpg",
      img2: "/img/p5.jpg",
      img3: "/img/p5.jpg",
      img4: "/img/p5.jpg",
      img5: "/img/p5.jpg",
      price: [
        { type: "Adult", amount_egy: 30 * 50, amount_euro: 30 },
        { type: "Child", amount_egy: 10 * 50, amount_euro: 10 },
      ],
      from: "8",
      to: "4",
      rating: 4.8,
      features: [
        {
          // icon: <TbCalendarCancel className="text-[25px]" />,
          title: "Free cancellation",
          subtitle: "Cancel up to 24 hours in advance for a full refund.",
        },
        {
          // icon: <BsCalendar2MinusFill className="text-[25px]" />,
          title: "Reserve now & pay later",
          subtitle:
            "Keep your travel plans flexible — book your spot and pay nothing today.",
        },

        {
          // icon: <BsPersonRaisedHand className="text-[25px]" />,
          title: "Live tour guide",
          subtitle: "English",
        },

        {
          // icon: <FaWheelchair className="text-[25px]" />,
          title: "Wheelchair accessible",
        },
      ],
    },
    {
      id: "3",
      title: "Relax Day",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",

      img: "/img/p3.jpg",
      img2: "/img/p3.jpg",
      img3: "/img/p3.jpg",
      img4: "/img/p3.jpg",
      img5: "/img/p3.jpg",
      price: [
        { type: "Adult", amount_egy: 40 * 50, amount_euro: 40 },
        { type: "Child", amount_egy: 10 * 50, amount_euro: 10 },
      ],
      from: "8",
      to: "4",
      rating: 4.8,
      features: [
        {
          // icon: <TbCalendarCancel className="text-[25px]" />,
          title: "Free cancellation",
          subtitle: "Cancel up to 24 hours in advance for a full refund.",
        },
        {
          // icon: <BsCalendar2MinusFill className="text-[25px]" />,
          title: "Reserve now & pay later",
          subtitle:
            "Keep your travel plans flexible — book your spot and pay nothing today.",
        },

        {
          // icon: <BsPersonRaisedHand className="text-[25px]" />,
          title: "Live tour guide",
          subtitle: "English",
        },

        {
          // icon: <FaWheelchair className="text-[25px]" />,
          title: "Wheelchair accessible",
        },
      ],
    },
  ],
};
const tripsSlice = createSlice({
  name: "trips",
  initialState,
  reducers: {},
});

export default tripsSlice.reducer;
