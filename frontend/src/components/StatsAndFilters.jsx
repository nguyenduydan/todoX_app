import React from 'react'
import { Badge } from './ui/badge';
import { FilterType } from '@/lib/data';
import { Button } from './ui/button';
import { Filter } from 'lucide-react';

const StatsAndFilters = ({compeleteTasksCount = 0, activeTasksCount = 0, filter = "all", setFilter }) => {
  return (
    <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 '>
      {/* Thong ke */}
      <div className='flex gap-3'>
        <Badge
          variant="secondary"
          className="bg-black/50 py-2 text-accent-foreground border-info/20"
        >
          {activeTasksCount} {FilterType.active}
        </Badge>

        <Badge
          variant="secondary"
          className="bg-black/50 py-2 text-success border-info/20"
        >
          {compeleteTasksCount} {FilterType.complete}
        </Badge>
      </div>
      {/* phan filter */}
      <div className='flex flex-col gap-2 sm:flex-row'>
      {
        Object.keys(FilterType).map((type) =>(
          <Button
            key={type}
            variant={filter === type ? "gradient" : "ghost"}
            size ="sm"
            className="capitalize"
            onClick={() => setFilter(type)}
          >
            <Filter className='size-4'/>
            {FilterType[type]}
          </Button>
        ))
      }
      </div>
    </div>
  )
}

export default StatsAndFilters
