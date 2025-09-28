import React, { useState } from 'react'
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

const AddTask = ({handleNewTaskAdded}) => {
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const addTask = async () => {
    if (newTaskTitle.trim()) {
      try {
        await axios.post('/tasks', { title: newTaskTitle })
        toast.success(`Nhiệm vụ ${newTaskTitle} đã được thêm!`)
        handleNewTaskAdded()
      } catch (error) {
        console.log("Lỗi xảy ra khi thêm task: ", error);
        toast.error("Lỗi xảy ra khi thêm task")
      }

      setNewTaskTitle("")
    }else{
      toast.warning("Bạn cần nhập nội dung nhiệm vụ!")
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask()
    }
  }

  return (
    <Card className="p-6 border-0 bg-gradient-card shadow-custom-lg">
      <div className='flex flex-col gap-3 sm:flex-row'>
        <Input
          type={"text"}
          placeholder="Add a new task..."
          className="h-12 text-base bg-slate-50 sm:flex-1 border-border/50 focus:border-primary/50 focus:ring-primary/20"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          onKeyPress={newTaskTitle.trim() && handleKeyPress}
        />

        <Button
          variant="gradient"
          size="xl"
          className="p-6 cursor-pointer"
          onClick={addTask}
          disabled = {!newTaskTitle.trim()}
          >
            <Plus className='size-5'/>
            Thêm
        </Button>
      </div>
    </Card>
  )
}

export default AddTask
