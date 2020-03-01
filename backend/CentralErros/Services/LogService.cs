using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CentralErros.Models;
using Microsoft.EntityFrameworkCore;

namespace CentralErros.Services
{
    public class LogService : ILogService
    {
        private CentralErrosContext _context;

        public LogService(CentralErrosContext context)
        {
            _context = context;
        }

        public List<Log> FindAllByUserId(int userId)
        {
            return _context.Users.Where(el => el.Id == userId)
                .SelectMany(el => el.Logs)
                .ToList();
        }

        public IEnumerable<Log> FindByLevel(string level)
        {
            return _context.Logs.Where(el => el.Level.Contains(level))
                .ToList();
        }

        public IEnumerable<Log> FindByEnvironment(string environment)
        {
            return GetAll().Where(el => el.Environment.Contains(environment, StringComparison.OrdinalIgnoreCase))
                .ToList();
        }

        public IEnumerable<Log> FindByDescricao(string descricao)
        {
            return GetAll().Where(el => el.Detail.Contains(descricao, StringComparison.OrdinalIgnoreCase))
                .ToList();
        }

        public IEnumerable<Log> FindByOrigem(string origem)
        {
            return GetAll().Where(el => el.Origin.Contains(origem, StringComparison.OrdinalIgnoreCase))
                .ToList();
        }

        public IEnumerable<Log> OrderByLevel()
        {
            return GetAll()
                .OrderBy(el => el.Level);
        }

        public Log Get(int id)
        {
            return _context.Logs.Where(el => el.Id == id)
                .FirstOrDefault();
        }

        public List<Log> GetAll()
        {
            return _context.Logs.Where(el => el.Archived == false)
                .ToList();
        }

        public Log Save(Log log)
        {
            log.CreatedAt = DateTime.Now;
            var state = log.Id == 0 ? EntityState.Added : EntityState.Modified;
            log.User = _context.Users.Where(el => el.Id == log.UserId).FirstOrDefault();
            _context.Entry(log).State = state;
            _context.SaveChanges();
            return log;
        }

        public Log Delete(Log log)
        {
            _context.Entry(log).State = EntityState.Deleted;
            _context.SaveChanges();
            return log;
        }

        public Log Archive(Log log)
        {
            log.Archived = log.Archived == false ? true : false;
            return Save(log);
        }
    }
}
