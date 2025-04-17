import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Pagination } from '../../components/ui/paging/pagination';

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'The size of the pagination component'
    },
    index: {
      control: { type: 'number' },
      description: 'The current page index (0-based)'
    },
    total: {
      control: { type: 'number' },
      description: 'The total number of pages'
    },
    pageSize: {
      control: { type: 'number' },
      description: 'The number of items per page'
    },
    hasNext: {
      control: 'boolean',
      description: 'Whether there is a next page',
    },
    hasPrevious: {
      control: 'boolean',
      description: 'Whether there is a previous page',
    },
    onChangeIndex: {
      action: 'page changed',
      description: 'Callback when page changes',
    },
  },
  args: {
    size: 'medium',
    index: 0,
    total: 10,
    pageSize: 10,
    hasNext: true,
    hasPrevious: false,
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {

};

export const Small: Story = {
  args: {
    size: 'small',
    index: 0,
    total: 10,
    hasNext: true,
    hasPrevious: false,
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
    index: 0,
    total: 10,
    hasNext: true,
    hasPrevious: false,
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    index: 0,
    total: 10,
    hasNext: true,
    hasPrevious: false,
  },
};

export const MiddlePage: Story = {
  args: {
    index: 5,
    total: 10,
    hasNext: true,
    hasPrevious: true,
  },
};

export const LastPage: Story = {
  args: {
    index: 9,
    total: 10,
    hasNext: false,
    hasPrevious: true,
  },
};

export const SinglePage: Story = {
  args: {
    index: 0,
    total: 1,
    hasNext: false,
    hasPrevious: false,
  },
};

export const WithPageSize: Story = {
  args: {
    index: 0,
    total: 10,
    pageSize: 5,
    hasNext: true,
    hasPrevious: false,
  },
};

export const Interactive: StoryObj = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [currentPage, setCurrentPage] = useState(0);
    const totalPages = 10;
    
    const handlePageChange = (page: number) => {
      setCurrentPage(page);
    };
    
    return (
      <div className="space-y-4">
        <div className="text-center mb-4">
          <p>Current Page: {currentPage + 1}</p>
        </div>
        
        <Pagination
            size="small"
            pageSize={5}
          index={currentPage}
          total={totalPages}
          hasNext={currentPage < totalPages - 1}
          hasPrevious={currentPage > 0}
          onChangeIndex={handlePageChange}
        />
      </div>
    );
  },
};

export const TableExample: StoryObj = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 5;
    const totalItems = 47;
    const totalPages = Math.ceil(totalItems / pageSize);
    
    const handlePageChange = (page: number) => {
      setCurrentPage(page);
    };
    
    // Generate mock data
    const generateData = () => {
      const data = [];
      const startItem = currentPage * pageSize;
      const endItem = Math.min(startItem + pageSize, totalItems);
      
      for (let i = startItem; i < endItem; i++) {
        data.push({
          id: i + 1,
          name: `Item ${i + 1}`,
          category: `Category ${(i % 5) + 1}`,
          status: i % 3 === 0 ? 'Active' : i % 3 === 1 ? 'Pending' : 'Inactive',
        });
      }
      
      return data;
    };
    
    const data = generateData();
    
    return (
      <div className="w-full max-w-3xl mx-auto">
        <div className="border rounded-md overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-neutral-100 dark:bg-neutral-800">
              <tr>
                <th className="px-4 py-2 text-left font-medium">ID</th>
                <th className="px-4 py-2 text-left font-medium">Name</th>
                <th className="px-4 py-2 text-left font-medium">Category</th>
                <th className="px-4 py-2 text-left font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800">
                  <td className="px-4 py-3">{item.id}</td>
                  <td className="px-4 py-3">{item.name}</td>
                  <td className="px-4 py-3">{item.category}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded-full ${
                        item.status === 'Active'
                          ? 'bg-success-100 text-success-700 dark:bg-success-900 dark:text-success-300'
                          : item.status === 'Pending'
                          ? 'bg-warning-100 text-warning-700 dark:bg-warning-900 dark:text-warning-300'
                          : 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-neutral-500 dark:text-neutral-400">
            Showing {currentPage * pageSize + 1} to {Math.min((currentPage + 1) * pageSize, totalItems)} of {totalItems} items
          </div>
          
          <Pagination
            index={currentPage}
            total={totalPages}
            pageSize={pageSize}
            hasNext={currentPage < totalPages - 1}
            hasPrevious={currentPage > 0}
            onChangeIndex={handlePageChange}
            size="small"
          />
        </div>
      </div>
    );
  },
};

export const PaginationWithCustomStyles: StoryObj = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [currentPage, setCurrentPage] = useState(0);
    const totalPages = 10;
    
    const handlePageChange = (page: number) => {
      setCurrentPage(page);
    };
    
    return (
      <div className="space-y-4">
        <Pagination
          index={currentPage}
          total={totalPages}
          hasNext={currentPage < totalPages - 1}
          hasPrevious={currentPage > 0}
          onChangeIndex={handlePageChange}
          className="bg-primary-50 p-4 rounded-lg shadow-md dark:bg-primary-900"
        />
      </div>
    );
  },
};
