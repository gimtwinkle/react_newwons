'use client';

import {
  DateSelectArg,
  EventApi,
  EventClickArg,
  EventContentArg,
  formatDate,
} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useEffect, useState } from 'react';

import { addDoc, collection, getDocs } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../firebase';
import { createEventId, INITIAL_EVENTS } from '../../utils/calendar';
import styles from './page.module.css';

const Calendar = () => {
  const { user } = useAuth();
  const [weekendsVisible, setWeekendsVisible] = useState<boolean>(true);
  const [currentEvents, setCurrentEvents] = useState<any[]>([]);

  /** 주말 표시 토글 */
  const handleWeekendsToggle = () => {
    setWeekendsVisible(!weekendsVisible);
  };

  /** 날짜 선택 이벤트 */
  const handleDateSelect = async (selectInfo: DateSelectArg) => {
    const title = prompt('새로운 이벤트 제목을 입력하세요');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // 선택 초기화

    if (title) {
      const newEvent = {
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
        author: user?.displayName,
      };

      calendarApi.addEvent(newEvent);

      try {
        await addDoc(collection(db, 'calendar'), newEvent);
      } catch (error) {
        console.error('이벤트 저장 오류:', error);
      }
    }
  };

  /** 이벤트 클릭 시 삭제 */
  const handleEventClick = (clickInfo: EventClickArg) => {
    if (confirm(`이벤트 '${clickInfo.event.title}'을(를) 삭제하시겠습니까?`)) {
      clickInfo.event.remove();
    }
  };

  /** 전체 이벤트 리스트 업데이트 */
  const handleEvents = (events: any[]) => {
    setCurrentEvents(events);
  };

  return (
    <div className={styles.calendarContainer}>
      <Sidebar
        weekendsVisible={weekendsVisible}
        handleWeekendsToggle={handleWeekendsToggle}
        currentEvents={currentEvents}
      />

      <div className={styles.calendarWrapper}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={weekendsVisible}
          initialEvents={INITIAL_EVENTS} // 초기 이벤트 데이터
          select={handleDateSelect}
          eventContent={renderEventContent} // 이벤트 렌더링
          eventClick={handleEventClick}
          eventsSet={handleEvents} // 전체 이벤트 업데이트
        />
      </div>
    </div>
  );
};

const EventContent = ({ eventInfo }: { eventInfo: EventContentArg }) => {
  const [eventTitle, setEventTitle] = useState(eventInfo.event.title);

  useEffect(() => {
    const fetchEvent = async () => {
      const querySnapshot = await getDocs(collection(db, 'calendar'));
      querySnapshot.forEach((doc) => {
        if (doc.id === eventInfo.event.id) {
          setEventTitle(doc.data().title);
        }
      });
    };
    fetchEvent();
  }, [eventInfo.event.id]);

  return (
    <>
      <b>{eventInfo.timeText}</b>
      <b>{eventInfo.timeText}</b>
      <i>{eventTitle}</i>
    </>
  );
};

// FullCalendar에서 사용
const renderEventContent = (eventInfo: EventContentArg) => {
  return <EventContent eventInfo={eventInfo} />;
};

/** 사이드바 */
const Sidebar = ({
  weekendsVisible,
  handleWeekendsToggle,
  currentEvents,
}: {
  weekendsVisible: boolean;
  handleWeekendsToggle: () => void;
  currentEvents: any[];
}) => {
  return (
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
          <input type="checkbox" checked={weekendsVisible} onChange={handleWeekendsToggle} />
          주말 표시
        </label>
      </div>

      <div className={styles.sidebarSection}>
        <h2>📅 전체 이벤트 ({currentEvents.length})</h2>
        <ul>
          {currentEvents.map((event) => (
            <SidebarEvent key={event.id} event={event} />
          ))}
        </ul>
      </div>
    </div>
  );
};

/** 사이드바 이벤트 리스트 */
const SidebarEvent = ({ event }: { event: EventApi }) => {
  return (
    <li>
      <b>{formatDate(event.start as Date, { year: 'numeric', month: 'short', day: 'numeric' })}</b>
      <i>{event.title}</i>
    </li>
  );
};

export default Calendar;
