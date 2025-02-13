'use client';

import { uuidv4 } from '@firebase/util';
import { DateSelectArg, EventClickArg, EventContentArg, EventDropArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { EventResizeDoneArg } from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../firebase';
import styles from './page.module.css';

interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  allDay: boolean;
  author?: string | undefined | null;
  authorEmail?: string | undefined | null;
  backgroundColor?: string;
}

const Calendar = () => {
  const { user } = useAuth();
  const userEmail = user?.email || 'default';

  // ✅ 각자의 아이디와 원하는 색상코드를 입력해주세용~!
  const userColors: Record<string, string> = {
    'beingnami2023@gmail.com': '#3aa18c',
    '1@gmail.com': '#000',
    '2@gmail.com': '#111',
    default: '#888888', // 기본 회색
  };

  const [weekendsVisible, setWeekendsVisible] = useState<boolean>(true);
  const [currentEvents, setCurrentEvents] = useState<CalendarEvent[]>([]);

  const handleWeekendsToggle = () => {
    setWeekendsVisible(!weekendsVisible);
  };

  const handleEventClick = async (clickInfo: EventClickArg) => {
    if (confirm(`이벤트 '${clickInfo.event.title}'을(를) 삭제하시겠습니까?`)) {
      clickInfo.event.remove();
      try {
        const querySnapshot = await getDocs(collection(db, 'calendar'));
        querySnapshot.forEach(async (docItem) => {
          if (docItem.data().id === clickInfo.event.id) {
            await deleteDoc(doc(db, 'calendar', docItem.id));
          }
        });
        setCurrentEvents((prev) => prev.filter((event) => event.id !== clickInfo.event.id));
      } catch (error) {
        console.error('이벤트 삭제 오류:', error);
      }
    }
  };

  const handleEventDrop = async (dropInfo: EventDropArg) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'calendar'));
      querySnapshot.forEach(async (docItem) => {
        if (docItem.data().id === dropInfo.event.id) {
          await updateDoc(doc(db, 'calendar', docItem.id), {
            start: dropInfo.event.start?.toISOString(),
            end: dropInfo.event.end?.toISOString(),
          });
        }
      });
    } catch (error) {
      console.error('이벤트 이동 오류:', error);
    }
  };

  const handleEventResize = async (resizeInfo: EventResizeDoneArg) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'calendar'));
      querySnapshot.forEach(async (docItem) => {
        if (docItem.data().id === resizeInfo.event.id) {
          await updateDoc(doc(db, 'calendar', docItem.id), {
            start: resizeInfo.event.start?.toISOString(),
            end: resizeInfo.event.end?.toISOString(),
          });
        }
      });
    } catch (error) {
      console.error('이벤트 크기 조정 오류:', error);
    }
  };

  const handleDateSelect = async (selectInfo: DateSelectArg) => {
    const title = prompt('새로운 이벤트 제목을 입력하세요');
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();

    if (title) {
      const userColor = userColors[userEmail] || userColors.default;

      const newEvent: CalendarEvent = {
        id: uuidv4(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
        author: user?.displayName,
        authorEmail: userEmail,
        backgroundColor: userColor,
      };

      calendarApi.addEvent(newEvent);

      try {
        await addDoc(collection(db, 'calendar'), newEvent);
        setCurrentEvents((prev) => [...prev, newEvent]);
      } catch (error) {
        console.error('이벤트 저장 오류:', error);
      }
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'calendar'));
        const events: CalendarEvent[] = querySnapshot.docs.map((doc) => {
          const eventData = doc.data();
          return {
            id: eventData.id,
            title: eventData.title,
            start: eventData.start,
            end: eventData.end,
            allDay: eventData.allDay,
            author: eventData.author ?? null,
            authorEmail: eventData.authorEmail ?? null,
            backgroundColor: userColors[eventData.authorEmail] || userColors.default,
          };
        });
        setCurrentEvents(events);
        console.log(events);
      } catch (error) {
        console.error('이벤트 불러오기 오류:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className={styles.calendarContainer}>
      <Sidebar weekendsVisible={weekendsVisible} handleWeekendsToggle={handleWeekendsToggle} />
      <div className={styles.calendarWrapper}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          initialView="dayGridMonth"
          editable
          selectable
          selectMirror
          dayMaxEvents
          weekends={weekendsVisible}
          events={currentEvents}
          select={handleDateSelect}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          eventDrop={handleEventDrop}
          eventResize={handleEventResize}
        />
      </div>
    </div>
  );
};

const EventContent = ({ eventInfo }: { eventInfo: EventContentArg }) => (
  <div
    style={{
      backgroundColor: eventInfo.event.backgroundColor,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}
  >
    <b className={styles.blind}>{eventInfo.timeText}</b>
    <i>{eventInfo.event.title}&nbsp;&nbsp;</i>
    <small>{eventInfo.event.extendedProps.author}</small>
  </div>
);

const Sidebar = ({
  weekendsVisible,
  handleWeekendsToggle,
}: {
  weekendsVisible: boolean;
  handleWeekendsToggle: () => void;
}) => (
  <div className={styles.sidebar}>
    <div className={styles.sidebarSection}>
      <h2>📌 사용 방법</h2>
      <ul>
        <li>날짜를 선택하면 새로운 이벤트를 생성할 수 있습니다.</li>
        <li>이벤트를 드래그 & 드롭하여 이동할 수 있습니다.</li>
        <li>이벤트를 클릭하면 삭제됩니다.</li>
      </ul>
    </div>
    <div className={styles.sidebarSection}>
      <label>
        <input type="checkbox" checked={weekendsVisible} onChange={handleWeekendsToggle} /> 주말
        표시
      </label>
    </div>
  </div>
);

const renderEventContent = (eventInfo: EventContentArg) => <EventContent eventInfo={eventInfo} />;

export default Calendar;
