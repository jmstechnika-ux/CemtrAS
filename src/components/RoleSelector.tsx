import React from 'react';
import { TrendingUp, Briefcase, ShoppingCart, Wrench, Users } from 'lucide-react';
import type { UserRole } from '../types';

interface RoleSelectorProps {
  selectedRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

const roles: { value: UserRole; label: string; icon: React.ReactNode; color: string; description: string }[] = [
  { 
    value: 'Marketing', 
    label: 'Marketing', 
    icon: <TrendingUp size={18} />, 
    color: 'border-purple-500 bg-purple-50 text-purple-700',
    description: 'Product features & market positioning'
  },
  { 
    value: 'Sales', 
    label: 'Sales', 
    icon: <Briefcase size={18} />, 
    color: 'border-green-500 bg-green-50 text-green-700',
    description: 'Customer value & ROI benefits'
  },
  { 
    value: 'Procurement', 
    label: 'Procurement', 
    icon: <ShoppingCart size={18} />, 
    color: 'border-blue-500 bg-blue-50 text-blue-700',
    description: 'Vendor evaluation & specifications'
  },
  { 
    value: 'Engineering', 
    label: 'Engineering', 
    icon: <Wrench size={18} />, 
    color: 'border-yellow-500 bg-yellow-50 text-yellow-700',
    description: 'Technical design & optimization'
  },
  { 
    value: 'Site Team', 
    label: 'Site Team', 
    icon: <Users size={18} />, 
    color: 'border-red-500 bg-red-50 text-red-700',
    description: 'Operations & troubleshooting'
  },
];

export const RoleSelector: React.FC<RoleSelectorProps> = ({ selectedRole, onRoleChange }) => {
  return (
    <div className="space-y-3">
      {roles.map((role) => (
        <button
          key={role.value}
          onClick={() => onRoleChange(role.value)}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 border-2 ${
            selectedRole === role.value
              ? `${role.color} shadow-lg transform scale-105`
              : 'border-gray-600 bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:border-gray-500'
          }`}
        >
          <div className={`p-2 rounded-lg ${selectedRole === role.value ? 'bg-white/20' : 'bg-gray-700'}`}>
            {role.icon}
          </div>
          <div className="text-left flex-1">
            <div className={`font-bold text-sm ${selectedRole === role.value ? '' : 'text-white'}`}>
              {role.label}
            </div>
            <div className={`text-xs ${selectedRole === role.value ? 'opacity-80' : 'text-gray-400'}`}>
              {role.description}
            </div>
          </div>
          {selectedRole === role.value && (
            <div className="w-3 h-3 bg-white rounded-full shadow-lg"></div>
          )}
        </button>
      ))}
    </div>
  );
};