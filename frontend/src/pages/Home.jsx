import AddTask from '@/components/AddTask';
import DateTimeFilters from '@/components/DateTimeFilters';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import StatsAndFilters from '@/components/StatsAndFilters';
import TaskList from '@/components/TaskList';
import TaskListPagination from '@/components/TaskListPagination';
import { useEffect, useState } from 'react'
import { toast } from 'sonner';
import api from '@/lib/axios';
import { visibleTaskLimit } from '@/lib/data';

const Home = () => {
  const [taskBuffer, setTaskBuffer] = useState([])
  const [activeTaskCount, setActiveTaskCount] = useState(0)
  const [completeTaskCount, setCompleteTaskCount] = useState(0)
  const [filter, setFilter] = useState('all')
  const [dateQuery, setDateQuery] = useState('today')
  const [page, setPage] = useState(1)

  useEffect(()=>{
    fetchTask()
  },[dateQuery])

  useEffect(()=>(
    setPage(1)
  ),[filter, dateQuery])

  const fetchTask = async () => {
    try {
      const res = await api.get(`/tasks?filter=${dateQuery}`)
      setTaskBuffer(res.data.tasks)
      setActiveTaskCount(res.data.activeCount)
      setCompleteTaskCount(res.data.completeCount)
    } catch (error) {
      console.log("Lỗi xảy ra khi truy xuất task: ", error);
      toast.error("Lỗi xảy ra khi truy xuất task")
    }
  }

  const handleTaskChange = () => {
    fetchTask();
  }

  const handleNext = () => {
    if(page < totalPage){
      setPage((prev) => prev + 1)
    }
  }

  const handlePrev = () => {
    if (page > 1){
      setPage((prev) => prev - 1)
    }
  }

  const handlePageChange = (newPage) =>{
    setPage(newPage)
  }

  //bien
  const filterTask = (taskBuffer || []).filter((task) => {
    switch (filter) {
      case 'active':
        return task.status === 'active';
      case 'complete':
        return task.status === 'complete';
      default:
        return true;
    }
  });

  const visibleTask = filterTask.slice(
    (page - 1) * visibleTaskLimit,
    page * visibleTaskLimit
  )

  if(visibleTask.length === 0){
    handlePrev()
  }

  const totalPage = Math.ceil(filterTask.length / visibleTaskLimit)

  return (
  <div className="min-h-screen w-full bg-[#020617] relative">
    {/* Dark Sphere Grid Background */}
    <div
      className="absolute inset-0 z-0"
      style={{
        background: "#020617",
        backgroundImage: `
          linear-gradient(to right, rgba(71,85,105,0.3) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(71,85,105,0.3) 1px, transparent 1px),
          radial-gradient(circle at 50% 50%, rgba(139,92,246,0.15) 0%, transparent 70%)
        `,
        backgroundSize: "32px 32px, 32px 32px, 100% 100%",
      }}
    />
      <div className='container pt-8 mx-auto relative z-10'>
        <div className='w-full max-w-2xl p-6 mx-auto space-y-6 text-white'>

          {/* Header */}
          <Header />

          {/* Create Task */}
          <AddTask handleNewTaskAdded={handleTaskChange}/>

          {/* Stats and Filters */}
          <StatsAndFilters
            filter={filter}
            setFilter={setFilter}
            activeTasksCount={activeTaskCount}
            compeleteTasksCount={completeTaskCount}
          />

          {/* Task list */}
          <TaskList
            filterTasks={visibleTask}
            filter={filter}
            handleTaskChanged={handleTaskChange}
          />

          {/* Pagination and DatetimeFilter */}
          <div className='flex flex-col sm:flex-row items-center justify-between gap-6'>
            <TaskListPagination
              handleNext = {handleNext}
              handlePrev = {handlePrev}
              handlePageChange = {handlePageChange}
              page = {page}
              totalPage = {totalPage}
            />
            <DateTimeFilters dateQuery= {dateQuery} setDateQuery = {setDateQuery}/>
          </div>

          {/*Footer*/}
          <Footer
            activeTaskCount={activeTaskCount}
            completeTaskCount={completeTaskCount}
          />

        </div>
      </div>
  </div>
  )
}

export default Home
