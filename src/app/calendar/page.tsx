'use client';
import Input from '@/components/common/Input';
import Modal from '@/components/common/Modal';
import ColorPicker from '@/components/feature/ColorPicker';
import { DateSelectArg, EventClickArg, EventContentArg, EventDropArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { EventResizeDoneArg } from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../firebase';
import { createEventId } from '../../utils/calendar';
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
  const escapeEmailId = (id: string) => {
    return String(id || '').replace(/\./g, '_'); // "." → "_"
  };

  const { user } = useAuth();
  const getEmailIdPattern = useMemo(() => /^[^@]+/, []);

  const userEmailIdAsIs = user?.email?.match(getEmailIdPattern)?.[0] || '';
  const userEmailId = escapeEmailId(userEmailIdAsIs);
  const [weekendsVisible, setWeekendsVisible] = useState<boolean>(true);
  const [currentEvents, setCurrentEvents] = useState<CalendarEvent[]>([]);
  const [userColorList, setUserColorList] = useState<Record<string, string>>({});
  const [showModal, setShowModal] = useState(false);

  const handleWeekendsToggle = () => {
    setWeekendsVisible(!weekendsVisible);
  };

  const fetchUserColors = async () => {
    try {
      const docRef = doc(db, 'userColors', 'list');
      const docSnap = await getDoc(docRef);
      const userColors = docSnap.data();

      if (userColors) {
        setUserColorList(userColors as Record<string, string>);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserColors();
  }, []);

  useEffect(() => {
    console.log('02. 모달 useEffect 실행');
    if (userColorList && Object.keys(userColorList).length > 0) {
      if (userColorList[userEmailId]) {
        console.log('02-1. 이미 값이 있음');
        setShowModal(false);
      } else {
        console.log('02-2. 값이 없어서 모달 띄움');
        setShowModal(true);
      }
    }
  }, [userColorList, userEmailId]);

  const handleDateSelect = async (selectInfo: DateSelectArg) => {
    const title = prompt('새로운 이벤트 제목을 입력하세요');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect();

    if (title) {
      const newEvent = {
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
        author: user?.displayName,
        authorEmail: user?.email,
        backgroundColor: userColorList[userEmailId] || '',
      };

      calendarApi.addEvent(newEvent);

      try {
        await addDoc(collection(db, 'calendar'), newEvent);
      } catch (error) {
        console.error('이벤트 저장 오류:', error);
      }
    }
  };

  const handleEventClick = async (clickInfo: EventClickArg) => {
    if (clickInfo.event.extendedProps.authorEmail !== user?.email) {
      alert('왜 남의 휴.가.를 삭제하려고 하시죠?');
      return;
    }

    if (confirm(`이벤트 '${clickInfo.event.title}'을(를) 삭제하시겠습니까?`)) {
      const eventIdToDelete = clickInfo.event.id;

      clickInfo.event.remove();

      try {
        const querySnapshot = await getDocs(collection(db, 'calendar'));
        querySnapshot.forEach(async (docItem) => {
          if (docItem.data().id === eventIdToDelete) {
            await deleteDoc(doc(db, 'calendar', docItem.id));
          }
        });
      } catch (error) {
        console.error('이벤트 삭제 오류:', error);
        alert('이벤트 삭제 중 오류가 발생했습니다.');
      }
    }
  };

  const handleEventDrop = async (dropInfo: EventDropArg) => {
    const { event } = dropInfo;

    if (event.extendedProps.authorEmail !== user?.email) {
      alert('자신이 작성한 이벤트만 이동할 수 있습니다.');
      dropInfo.revert();
      return;
    }

    try {
      const querySnapshot = await getDocs(collection(db, 'calendar'));
      querySnapshot.forEach(async (docItem) => {
        if (docItem.data().id === event.id) {
          await updateDoc(doc(db, 'calendar', docItem.id), {
            start: event.start?.toISOString(),
            end: event.end?.toISOString(),
            allDay: event.allDay,
          });
        }
      });
    } catch (error) {
      console.error('이벤트 이동 오류:', error);
      alert('이벤트 이동 중 오류가 발생했습니다.');
      dropInfo.revert();
    }
  };

  const handleEventResize = async (resizeInfo: EventResizeDoneArg) => {
    const { event } = resizeInfo;

    if (event.extendedProps.authorEmail !== user?.email) {
      alert('자신이 작성한 이벤트만 크기를 조절할 수 있습니다.');
      resizeInfo.revert();
      return;
    }

    try {
      const querySnapshot = await getDocs(collection(db, 'calendar'));
      querySnapshot.forEach(async (docItem) => {
        if (docItem.data().id === event.id) {
          await updateDoc(doc(db, 'calendar', docItem.id), {
            start: event.start?.toISOString(),
            end: event.end?.toISOString(),
          });
        }
      });
    } catch (error) {
      console.error('이벤트 크기 조정 오류:', error);
      alert('이벤트 크기 조정 중 오류가 발생했습니다.');
      resizeInfo.revert();
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'calendar'));
        const events: CalendarEvent[] = querySnapshot.docs.map((doc) => {
          const eventData = doc.data();
          const authorEmailIdAsIs = eventData.authorEmail?.match(getEmailIdPattern)?.[0] || '';
          const escapedAuthorEmailId = escapeEmailId(authorEmailIdAsIs);

          return {
            id: eventData.id,
            title: eventData.title,
            start: eventData.start,
            end: eventData.end,
            allDay: eventData.allDay,
            author: eventData.author ?? null,
            authorEmail: eventData.authorEmail ?? null,
            backgroundColor: userColorList[escapedAuthorEmailId] || '',
          };
        });
        setCurrentEvents(events);
      } catch (error) {
        console.error('이벤트 불러오기 오류:', error);
      }
    };

    if (Object.keys(userColorList).length > 0) {
      fetchEvents();
    }
  }, [userColorList, getEmailIdPattern]);

  return (
    <>
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      >
        <ColorPicker
          onClose={async () => {
            setShowModal(false);
            await fetchUserColors();
          }}
        />
      </Modal>
      <div className={styles.calendarContainer}>
        <Sidebar
          weekendsVisible={weekendsVisible}
          handleWeekendsToggle={handleWeekendsToggle}
          onColorChange={() => {
            setShowModal(true);
          }}
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
            events={currentEvents}
            weekends={weekendsVisible}
            select={handleDateSelect}
            eventContent={renderEventContent}
            eventClick={handleEventClick}
            eventDrop={handleEventDrop}
            eventResize={handleEventResize}
          />
        </div>
      </div>
    </>
  );
};

const EventContent = ({ eventInfo }: { eventInfo: EventContentArg }) => {
  return (
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
};

const renderEventContent = (eventInfo: EventContentArg) => {
  return <EventContent eventInfo={eventInfo} />;
};

const Sidebar = ({
  weekendsVisible,
  handleWeekendsToggle,
  onColorChange,
}: {
  weekendsVisible: boolean;
  handleWeekendsToggle: () => void;
  onColorChange: () => void;
}) => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarSection}>
        <h1>🎈happy vacation🎊🎆🎇✨🎉</h1>
        <br />
        <br />
        <h3>📌 사용 방법</h3>
        <ul style={{ margin: '10px 25px 35px' }}>
          <li>날짜를 선택하면 새로운 이벤트를 생성할 수 있습니다.</li>
          <li>이벤트를 드래그 & 드롭하여 이동할 수 있습니다.</li>
          <li>이벤트를 클릭하면 삭제됩니다.</li>
        </ul>
      </div>

      <div className={styles.sidebarSection}>
        <label>
          <Input
            type="checkbox"
            checked={weekendsVisible}
            onChange={handleWeekendsToggle}
            style={{
              width: '20px',
              height: '20px',
              verticalAlign: 'middle',
              margin: '10px',
            }}
          />
          주말표시
        </label>
        <div>
          <button onClick={onColorChange}>컬러 변경하기</button>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
